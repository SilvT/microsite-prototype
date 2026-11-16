const FLIGHT_MS = 850;
const EASE = "cubic-bezier(.3, 0, .2, 1)";

/**
 * Hand-off from the end of the loading intro to the landing page. The logo and the greeting exist in
 * both (same artwork / same text, different size and place), so instead of cutting between the two we
 * fly copies of the intro's versions to wherever the landing page's versions are. The rest of the
 * landing page fades in underneath meanwhile. When the copies arrive they are swapped for the real
 * elements at the exact same spot, so the swap is invisible.
 *
 * Positions are measured at call time, so it stays correct for any phone size, notch offset or address length.
 * Returns a cleanup that cancels the flight (used when the intro is replayed).
 */
export function flyHeaderToLanding(stage: HTMLElement): () => void {
  const shell = stage.closest<HTMLElement>(".app-shell");
  const landing = shell?.querySelector<HTMLElement>(".landing-screen");
  if (!shell || !landing) return () => {};

  const pairs = [
    { kind: "logo", from: stage.querySelector<HTMLElement>(".wordmark"), to: landing.querySelector<HTMLElement>('[data-name="Navbar"] img') },
    { kind: "text", from: stage.querySelector<HTMLElement>(".greeting"), to: landing.querySelector<HTMLElement>('[data-node-id="2:1438"]') },
  ];
  if (pairs.some((p) => !p.from || !p.to)) return () => {};

  const s = shell.getBoundingClientRect();
  const ox = s.left + shell.clientLeft, oy = s.top + shell.clientTop; // the shell's padding box, for absolute coords
  const flyers: HTMLElement[] = [];
  const anims: Animation[] = [];

  const cleanup = () => {
    anims.forEach((a) => a.cancel());
    flyers.forEach((f) => f.remove());
    flyers.length = 0;
    delete landing.dataset.flight; // reveals the real landing elements
    stage.classList.remove("is-flying");
  };

  landing.dataset.flight = "1"; // hides the real landing logo + greeting while the copies fly
  stage.classList.add("is-flying"); // hides the intro's originals (the copies sit exactly on top of them)

  pairs.forEach(({ kind, from, to }, i) => {
    const a = from!.getBoundingClientRect(), b = to!.getBoundingClientRect();
    let el: HTMLElement;
    let move: string;
    if (kind === "logo") {
      el = document.createElement("img");
      (el as HTMLImageElement).src = from!.querySelector("img")!.src;
      Object.assign(el.style, { position: "absolute", display: "block", maxWidth: "none", left: `${a.left - ox}px`, top: `${a.top - oy}px`, width: `${a.width}px`, height: `${a.height}px` });
      move = `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${b.width / a.width}, ${b.height / a.height})`; // moves AND resizes
    } else {
      // Same text and size on both sides: lay it out at the landing width (so it wraps the same) and slide it over.
      el = from!.cloneNode(true) as HTMLElement;
      el.classList.remove("reveal-layer");
      const cx = a.left + a.width / 2;
      Object.assign(el.style, { position: "absolute", margin: "0", opacity: "1", animation: "none", transform: "none", left: `${cx - b.width / 2 - ox}px`, top: `${a.top - oy}px`, width: `${b.width}px` });
      move = `translate(${b.left + b.width / 2 - cx}px, ${b.top - a.top}px)`;
    }
    el.style.transformOrigin = "0 0";
    el.style.zIndex = "5";
    shell.appendChild(el);
    flyers.push(el);
    anims.push(el.animate([{ transform: "none" }, { transform: move }], { duration: FLIGHT_MS, delay: i * 70, easing: EASE, fill: "both" }));
  });

  Promise.all(anims.map((a) => a.finished)).then(cleanup, () => {}); // cancelled: cleanup already ran
  return cleanup;
}
