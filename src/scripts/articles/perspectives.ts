import { managePreview } from './preview-lifecycle.ts';

type Perspective = 'article' | 'code' | 'preview';
interface Resource {
  id: string;
  code?: HTMLElement;
  preview?: HTMLElement;
  files: HTMLElement[];
}

/** Enhance existing static resources in place. No source/body/frame is cloned. */
export function enhancePerspectives(root: HTMLElement): void {
  const nav = root.querySelector<HTMLElement>('[data-perspective-nav]');
  if (root.dataset.enhanced) return;
  const message = root.querySelector<HTMLElement>('[data-resource-message]');
  if (!nav) {
    // A prose-only page still explains removed resource links, without tab UI.
    const explain = () => {
      if (!message) return;
      let found = !location.hash;
      try { found ||= Boolean(document.getElementById(decodeURIComponent(location.hash.slice(1)))); } catch { /* Malformed fragment. */ }
      message.hidden = found;
      if (!found) message.textContent = 'The requested section or resource is unavailable. The article is shown.';
    };
    explain();
    window.addEventListener('hashchange', explain);
    return;
  }
  const tabs = [...nav.querySelectorAll<HTMLAnchorElement>('[data-perspective]')];
  const fallbackHrefs = new Map(tabs.map(tab => [tab, tab.getAttribute('href')!]));
  const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
  const resources: Resource[] = [...root.querySelectorAll<HTMLElement>('[data-example]')].map(example => ({
    id: example.dataset.example!, code: example.querySelector<HTMLElement>('[data-code]') ?? undefined,
    preview: example.querySelector<HTMLElement>('[data-preview]') ?? undefined,
    files: [...example.querySelectorAll<HTMLElement>('[data-source-file]')],
  }));
  const homes = new Map<HTMLElement, Comment>();
  const previews = new Map<HTMLElement, ReturnType<typeof managePreview>>();
  const files = new Map<string, string>();
  const controller = new AbortController();
  const { signal } = controller;
  let perspective: Perspective = 'article';
  let selected: Resource | undefined;
  let failed = false;

  const panel = (view: Perspective) => panels.find(panel => panel.dataset.panel === view)!;
  const eligible = (view: 'code' | 'preview') => resources.filter(resource => resource[view]);
  const restore = (keep?: HTMLElement) => {
    for (const [resource, home] of homes) if (resource !== keep && home.nextSibling !== resource) home.after(resource);
    for (const resource of resources) for (const file of resource.files) file.hidden = false;
  };
  const fallback = () => {
    if (failed) return;
    failed = true;
    controller.abort();
    restore();
    for (const preview of previews.values()) preview.dispose();
    for (const home of homes.values()) home.remove();
    for (const element of [nav, ...tabs, ...panels]) {
      for (const attribute of ['role', 'aria-selected', 'aria-controls', 'aria-labelledby', 'tabindex']) element.removeAttribute(attribute);
    }
    for (const tab of tabs) tab.setAttribute('href', fallbackHrefs.get(tab)!);
    for (const item of panels) item.hidden = item.dataset.panel !== 'article';
    if (message) message.hidden = true;
    if (document.activeElement instanceof HTMLElement && document.activeElement.closest('[hidden]')) tabs[0]?.focus({ preventScroll: true });
    delete root.dataset.enhanced;
  };
  const safely = (action: () => void) => { try { action(); } catch { fallback(); } };
  const fragment = () => perspective === 'article' ? '#article' : `#${perspective}-${selected!.id}`;
  const push = (hash: string) => { if (location.hash !== hash) history.pushState(null, '', hash); };

  const render = (view: Perspective, resource?: Resource, fileId?: string) => {
    perspective = view;
    if (view !== 'article') {
      selected = resource?.[view] ? resource : selected?.[view] ? selected : eligible(view)[0];
      if (!selected) throw new Error('Unavailable perspective');
      if (fileId) files.set(selected.id, fileId);
      const current = panel(view);
      const host = [...current.querySelectorAll<HTMLElement>('[data-resource-host]')].find(host => host.dataset.resourceHost === selected!.id)!;
      restore(selected[view]);
      if (selected[view]!.parentElement !== host) host.append(selected[view]!);
      for (const context of current.querySelectorAll<HTMLElement>('[data-resource-context]')) context.hidden = context.dataset.resourceContext !== selected.id;
      const selector = current.querySelector<HTMLSelectElement>('[data-example-select]');
      if (selector) selector.value = selected.id;
      if (view === 'code') {
        const id = files.get(selected.id) ?? selected.files[0]!.dataset.sourceFile!;
        for (const file of selected.files) file.hidden = file.dataset.sourceFile !== id;
        const selector = current.querySelector<HTMLSelectElement>(`[data-file-select="${selected.id}"]`);
        if (selector) selector.value = id;
      }
    }
    if (view === 'article') restore();
    for (const item of panels) item.hidden = item.dataset.panel !== view;
    for (const tab of tabs) {
      const active = tab.dataset.perspective === view;
      tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1;
      const kind = tab.dataset.perspective as Perspective;
      const example = kind === 'article' ? undefined : selected?.[kind] ? selected : eligible(kind)[0];
      tab.hash = kind === 'article' ? '#article' : `#${kind}-${example!.id}`;
    }
    for (const [section, runtime] of previews) runtime.setActive(view === 'article' || (view === 'preview' && section === selected?.preview));
    if (message) message.hidden = true;
  };

  const navigate = (scroll: boolean) => {
    let target: HTMLElement | null = null;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* Invalid encoding is an unavailable target. */ }
    const resource = resources.find(resource => [resource.code, resource.preview].some(node => node && target && node.contains(target)));
    const view = resource?.code?.contains(target) ? 'code' : resource?.preview?.contains(target) ? 'preview' : 'article';
    const file = target?.closest<HTMLElement>('[data-source-file]')?.dataset.sourceFile;
    const hiddenFocus = document.activeElement instanceof HTMLElement && root.contains(document.activeElement) && document.activeElement !== document.body;
    render(view, resource, file);
    if (location.hash && !target && message) {
      message.textContent = 'The requested section or resource is unavailable. The article is shown.';
      message.hidden = false;
    }
    if (scroll && target) {
      target.scrollIntoView({ block: 'start' });
      if (!target.hasAttribute('tabindex')) {
        target.tabIndex = -1;
        target.addEventListener('blur', () => target?.removeAttribute('tabindex'), { once: true, signal });
      }
      target.focus({ preventScroll: true });
    } else if (hiddenFocus && (document.activeElement as HTMLElement).closest('[hidden]')) {
      tabs.find(tab => tab.dataset.perspective === view)!.focus({ preventScroll: true });
    }
  };

  try {
    // Verify relationships before adding roles or hiding any baseline content.
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
    if (!message || ids.length !== new Set(ids).size || !panel('article') || tabs.some(tab => !panels.some(panel => panel.dataset.panel === tab.dataset.perspective))) throw new Error('Incomplete perspective structure');
    for (const resource of resources) {
      for (const node of [resource.code, resource.preview]) if (node) {
        const home = document.createComment('resource home'); node.before(home); homes.set(node, home);
      }
      if (resource.preview) previews.set(resource.preview, managePreview(resource.preview, signal));
    }
    nav.addEventListener('click', event => safely(() => {
      const tab = (event.target as Element).closest<HTMLAnchorElement>('[data-perspective]');
      if (!tab || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      event.preventDefault(); render(tab.dataset.perspective as Perspective); push(fragment());
    }), { signal });
    nav.addEventListener('keydown', event => safely(() => {
      const index = tabs.indexOf(event.target as HTMLAnchorElement);
      if (index < 0) return;
      let next: number | undefined;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault(); tabs.forEach((tab, i) => tab.tabIndex = i === next ? 0 : -1); tabs[next]!.focus();
      } else if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault(); tabs[index]!.click();
      }
    }), { signal });
    root.addEventListener('change', event => safely(() => {
      const select = event.target;
      if (!(select instanceof HTMLSelectElement)) return;
      if (select.dataset.exampleSelect) {
        const view = select.dataset.exampleSelect as 'code' | 'preview';
        render(view, resources.find(resource => resource.id === select.value)); push(fragment());
      } else if (select.dataset.fileSelect && selected) {
        render('code', selected, select.value); push(`#source-${selected.id}-${select.value}`);
      }
    }), { signal });
    window.addEventListener('hashchange', () => safely(() => navigate(true)), { signal });
    window.addEventListener('popstate', () => safely(() => navigate(true)), { signal });
    // Avoid leaving a roving-but-unselected tab as the next keyboard entry point.
    nav.addEventListener('focusout', event => {
      if (!nav.contains(event.relatedTarget as Node | null)) tabs.forEach(tab => tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1);
    }, { signal });
    for (const tab of tabs) {
      tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', `bbf-panel-${tab.dataset.perspective}`);
    }
    nav.setAttribute('role', 'tablist');
    for (const item of panels) {
      item.setAttribute('role', 'tabpanel'); item.setAttribute('aria-labelledby', `bbf-tab-${item.dataset.panel}`); item.tabIndex = 0;
    }
    root.dataset.enhanced = 'true';
    navigate(Boolean(location.hash));
  } catch { fallback(); }
}
