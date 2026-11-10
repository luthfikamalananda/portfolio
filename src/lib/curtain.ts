// Page-transition curtain (the StaggeredMenu "pre-layer" motion), used when switching Locale.
// Cover: panels sweep in from the right (CSS: html[data-curtain="cover"]), then we navigate.
// Reveal: the next page reads the "intro-next" flag in RootShell's head script and plays the intro.

const COVER_MS = 850;

export function navigateWithCurtain(href: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    window.location.assign(href);
    return;
  }
  try {
    sessionStorage.setItem("intro-next", "1");
  } catch {
    /* storage blocked — the next page simply won't play the reveal */
  }
  document.documentElement.setAttribute("data-curtain", "cover");
  window.setTimeout(() => window.location.assign(href), COVER_MS);
}

/** onClick for <a> elements that switch Locale: keeps cmd/ctrl-click (new tab) working. */
export function curtainClick(href: string) {
  return (event: React.MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigateWithCurtain(href);
  };
}
