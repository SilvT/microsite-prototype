// Shared timing for the loading intro. Times are "design ms"; the real clock runs SPEED x faster.
//
// Tightened from the original Figma timing (about 10.6s real) to about 6.6s real: the ~2s stretch where
// nothing new happened is gone, and the greeting reveal follows the landing directly.
//
//   0.1s  logo mark drops in and bounces      3.6s  mark rises into the lockup, 4.3s wordmark appears under it
//   1.2s  tomatoes start to rain down         4.7s  mark leaves upward, 5.3s wordmark glides up + greeting
//   2.4s  tomatoes switch to their footer pose 5.9s  thanks line, 7.1s hand-off to the landing page
export const SPEED = 1.05;

export const FRAME_TIMES = [100, 1100, 200, 200, 200, 200, 200, 200, 1900, 1000, 600, 1200];
export const ENTER_DURATIONS = [0, 1100, 200, 200, 200, 200, 200, 200, 1900, 500, 700, 300];
export const ENTER_EASINGS = [
  "linear",
  "linear",
  "linear",
  "linear",
  "linear",
  "linear",
  "linear",
  "linear",
  "linear",
  "ease-in-out",
  "cubic-bezier(.4, 0, .2, 1)", // frame 10: the wordmark glides to the top
  "cubic-bezier(.2, 0, 0, 1)",
];

/** Start time of each frame. */
export const START = FRAME_TIMES.reduce<number[]>((acc, _d, i) => (acc.push(i ? acc[i - 1] + FRAME_TIMES[i - 1] : 0), acc), []);
export const END = FRAME_TIMES.reduce((a, b) => a + b, 0);

/** Active frame at time t (12 = finished). */
export const frameAt = (t: number) => {
  if (t >= END) return 12;
  let k = 0;
  while (k < 11 && START[k + 1] <= t) k++;
  return k;
};
