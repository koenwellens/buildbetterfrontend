/** Manages existing sandboxed frames; never inspects or trusts preview content. */
export function managePreview(section: HTMLElement, signal: AbortSignal) {
  const frame = section.querySelector('iframe');
  const status = section.querySelector<HTMLElement>('[data-preview-status]');
  const retry = section.querySelector<HTMLButtonElement>('[data-preview-retry]');
  if (!frame || !status || !retry || !frame.getAttribute('src')) throw new Error('Incomplete preview controls');
  const url = frame.getAttribute('src')!;
  const fallback = status.textContent;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let allowed = false;
  let visible = false;
  const clear = () => { clearTimeout(timer); timer = undefined; };
  const start = () => {
    if (!allowed || !visible || frame.hasAttribute('src')) return;
    status.textContent = 'Loading preview…';
    frame.setAttribute('aria-busy', 'true');
    timer = setTimeout(() => {
      status.textContent = 'Preview taking too long? Reload it or open the separate preview link. Article and source remain available.';
      frame.removeAttribute('aria-busy');
    }, 12_000);
    frame.src = url;
  };
  const stop = () => {
    clear();
    frame.removeAttribute('src');
    frame.removeAttribute('aria-busy');
    status.textContent = fallback;
  };
  frame.addEventListener('load', () => {
    if (!frame.hasAttribute('src') || !allowed) return;
    clear();
    frame.removeAttribute('aria-busy');
    // A sandboxed frame's load event cannot prove HTTP/runtime success.
    status.textContent = 'Preview frame opened. If the example is unavailable, reload it or use the separate preview link.';
  }, { signal });
  frame.addEventListener('error', () => {
    clear();
    frame.removeAttribute('aria-busy');
    status.textContent = 'Preview could not load. Reload it or use the separate preview link. Article and source remain available.';
  }, { signal });
  retry.addEventListener('click', () => { stop(); start(); }, { signal });
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    start();
  }, { rootMargin: '200px' });
  observer.observe(frame);
  retry.hidden = false;
  status.setAttribute('role', 'status');
  return {
    setActive(active: boolean) { allowed = active; if (active) start(); else stop(); },
    dispose() {
      clear(); observer.disconnect(); retry.hidden = true;
      status.removeAttribute('role'); status.textContent = fallback;
      frame.removeAttribute('aria-busy'); frame.src = url;
    },
  };
}
