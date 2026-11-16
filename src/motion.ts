export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp = (u: number) => Math.min(1, Math.max(0, u));
export const smooth = (u: number) => u * u * (3 - 2 * u);

export const ease = {
  inOut: (u: number) => (u < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2),
  out: (u: number) => 1 - (1 - u) ** 2,
  /** Overshoots the target a little, then settles: a happy "pop". */
  back: (u: number, c = 1.3) => 1 + (c + 1) * (u - 1) ** 3 + c * (u - 1) ** 2,
};

/**
 * Free fall under gravity, then damped bounces. e = bounciness (0 = dead stop, 1 = perfect ball).
 *   p: progress 0..1 towards the resting position (dips back below 1 on each rebound)
 *   q: squash 0..1 around each impact          s: stretch 0..1, follows speed
 * The fall takes T ms; each rebound is e x as fast, so e x as long (2e overall) and e^2 as high.
 */
export function bounce(t: number, T: number, e: number, n = 4) {
  const pulse = () => {
    let q = 0, ti = T, dur = 2 * e * T, amp = 1;
    for (let k = 0; k < n; k++) {
      q += amp * Math.exp(-(((t - ti) / (0.06 * T)) ** 2));
      ti += dur; dur *= e; amp *= e;
    }
    return q;
  };
  if (t <= 0) return { p: 0, q: 0, s: 0 };
  if (t < T) return { p: (t / T) ** 2, q: pulse(), s: t / T };
  let s = t - T, dur = 2 * e * T, h = e * e, v = e;
  for (let k = 0; k < n; k++) {
    if (s < dur) {
      const x = (s / dur) * 2 - 1;
      return { p: 1 - h * (1 - x * x), q: pulse(), s: v * Math.abs(x) };
    }
    s -= dur; dur *= e; h *= e * e; v *= e;
  }
  return { p: 1, q: pulse(), s: 0 };
}

// ---- the tomato rain --------------------------------------------------------------------------
// Each tomato is ONE continuous fall under gravity from just above the screen: it never slows or
// pauses mid-air. The Figma instances still decide where each one ends up and roughly in what order.

export const RAIN_START = 1200; // design ms: when the first tomato starts to fall
const FALL_MS = 1300; // time from release to first impact
const TOMATO_E = 0.3; // how bouncy a landing is: bright, but they are still tomatoes

/** Non-footer tomatoes (px on the 568 design): fall straight through the screen and out the bottom. */
export function topTrack(tops: number[], { delay = 0, h = 150 } = {}) {
  const y0 = -h - 20, y1 = tops[8];
  return (t: number) => {
    const tau = t - RAIN_START - delay;
    if (tau <= 0) return y0;
    if (tau >= FALL_MS) return y1;
    return lerp(y0, y1, (tau / FALL_MS) ** 2);
  };
}

const parse = (s: string) => s.split(" ").map(parseFloat); // [top, right, bottom, left] in %

/** Footer tomatoes (inset %): fall to the footer, shrinking to size, and land with a bouncy squash. */
export function footerTrack(insets: string[], { delay = 0 } = {}) {
  const F = insets.map(parse);
  const geo = (f: number[]) => {
    const w = 100 - f[3] - f[1], h = 100 - f[0] - f[2];
    return { w, h, cx: f[3] + w / 2, cy: f[0] + h / 2 };
  };
  const a = geo(F[7]), b = geo(F[8]); // mid-screen size / footer size
  const cy0 = -a.h / 2 - 4; // just above the screen
  return (t: number): { inset: string; q: number } => {
    const tau = t - RAIN_START - delay;
    const { p, q } = bounce(tau, FALL_MS, TOMATO_E);
    const s = smooth(clamp(tau / FALL_MS)); // size + sideways travel finish at first impact
    const w = lerp(a.w, b.w, s), h = lerp(a.h, b.h, s), cx = lerp(a.cx, b.cx, s);
    const cy = lerp(cy0, b.cy, p);
    const top = cy - h / 2, left = cx - w / 2;
    return { inset: `${top}% ${100 - left - w}% ${100 - top - h}% ${left}%`, q };
  };
}

// ---- the logo mark ------------------------------------------------------------------------------
// Its whole journey is one clock-driven path (design px, centre y): elastic drop-in, a happy pop up into
// the lockup, a settle beside the wordmark, then a long unhurried glide out through the top.

const MARK = { w: 71.125, wLockup: 55.319, wSmall: 27.66, rest: 329, lockup: 67, small: 49.5, gone: -82.5 };
const MARK_BOUNCE = 0.45; // more elastic than the tomatoes

export function markState(t: number, dropAt: number) {
  const d = bounce(t - dropAt, 800, MARK_BOUNCE, 5);
  let y = lerp(-51, MARK.rest, d.p), w = MARK.w, n = 0; // n: how much of the notch offset applies
  if (t >= 3600) y = MARK.rest + 11 * ease.out(clamp((t - 3600) / 150)); // dip before the jump
  if (t >= 3750) {
    const r = clamp((t - 3750) / 700);
    y = lerp(340, MARK.lockup, ease.back(r)); // pop up, overshooting a little
    w = lerp(MARK.w, MARK.wLockup, ease.inOut(r));
  }
  if (t >= 4600) {
    const m = ease.inOut(clamp((t - 4600) / 550)); // shrink into the lockup
    y = lerp(MARK.lockup, MARK.small, m);
    w = lerp(MARK.wLockup, MARK.wSmall, m);
    n = m;
  }
  if (t >= 5200) {
    y = lerp(MARK.small, MARK.gone, ease.inOut(clamp((t - 5200) / 1600))); // slow start, long gentle glide out
    n = 1;
  }
  return { y, w, n, q: d.q, s: d.s };
}
