import { useEffect, useRef } from "react";
import { bounce, clamp, ease, lerp } from "./motion";

const REST = 13.8; // resting tilt (deg), as in the design
const REST_MS = 2400; // shortest rest between hops; each rest is random up to 5.8x this

/**
 * A hop "personality". Picking between these (never the same one twice in a row) keeps the corner tomato
 * from feeling repetitive. Heights are px; rise = ms to the top (gravity is symmetric, so the fall takes as long);
 * elastic = landing bounciness (each rebound is that fraction as fast); turns = full spins in the air.
 */
type Move = { name: string; h: [number, number]; rise: number; squat: number; elastic: number; rebounds: number; turns: number; tilt: number };
const MOVES: Move[] = [
  { name: "tiny hop", h: [26, 36], rise: 270, squat: 110, elastic: 0.42, rebounds: 3, turns: 0, tilt: 14 },
  { name: "jump", h: [54, 70], rise: 420, squat: 160, elastic: 0.5, rebounds: 4, turns: 1, tilt: 0 },
  { name: "big leap", h: [88, 108], rise: 540, squat: 200, elastic: 0.56, rebounds: 5, turns: 2, tilt: 0 },
  { name: "pop", h: [16, 22], rise: 210, squat: 90, elastic: 0.62, rebounds: 6, turns: 0, tilt: 8 },
];

const tailOf = (m: Move) => 2 * m.elastic * m.rise * ((1 - m.elastic ** m.rebounds) / (1 - m.elastic)) + 120; // all rebounds + settle
const lengthOf = (m: Move) => m.squat + 2 * m.rise + tailOf(m);

type Pose = { y: number; sx: number; sy: number; rot: number };

/** The pose `tau` ms into a hop of height `H` (px) with move `m`, spinning in direction `dir` (+1 / -1). */
function pose(tau: number, H: number, dir: number, m: Move): Pose {
  const { rise, squat, elastic, rebounds } = m;
  const air = 2 * rise;
  let y = 0, sx = 1, sy = 1;
  if (tau < squat) {
    // crouch: a little squash, sinking slightly
    const u = ease.inOut(tau / squat);
    y = 3 * u; sx = 1 + 0.08 * u; sy = 1 - 0.14 * u;
  } else if (tau < squat + rise) {
    // launch: decelerating rise (quadratic ease-out is exactly gravity), stretched while fast
    const u = (tau - squat) / rise;
    const from = ease.inOut(clamp(u / 0.2)); // out of the crouch, into the stretch
    y = lerp(3, -H, 1 - (1 - u) ** 2);
    sx = lerp(1.08, 1 - 0.05 * (1 - u), from); sy = lerp(0.86, 1 + 0.1 * (1 - u), from);
  } else {
    // fall from the top, then damped elastic rebounds; squash on every impact, stretch with speed
    const b = bounce(tau - squat - rise, rise, elastic, rebounds);
    y = -H * (1 - b.p);
    sx = 1 + 0.22 * b.q - 0.05 * b.s; sy = 1 - 0.3 * b.q + 0.1 * b.s;
  }
  // spin (whole turns) and/or a lean while airborne, then a small damped wobble from the impact
  const u = clamp((tau - squat) / air);
  const landed = Math.max(0, tau - squat - air);
  const wobble = dir * 9 * Math.exp(-landed / 220) * Math.sin(landed / 65);
  return { y, sx, sy, rot: REST + dir * 360 * m.turns * u + dir * m.tilt * Math.sin(Math.PI * u) + wobble };
}

/** Sampled keyframes for one hop (the physics is not a simple easing, so we sample it). */
function keyframes(H: number, dir: number, m: Move) {
  const total = lengthOf(m);
  const n = Math.ceil(total / 16);
  const hop: Keyframe[] = [], spin: Keyframe[] = [];
  for (let i = 0; i <= n; i++) {
    const p = pose((total * i) / n, H, dir, m);
    hop.push({ offset: i / n, transform: `translateY(${p.y}px) scale(${p.sx}, ${p.sy})` });
    spin.push({ offset: i / n, transform: `rotate(${p.rot}deg)` });
  }
  return { hop, spin, total };
}

export default function TomatoBounce({ active }: { active: boolean }) {
  const hop = useRef<HTMLDivElement>(null);
  const spin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    let timer = 0;
    let anims: Animation[] = [];
    let last = -1;
    const run = () => {
      // Every hop differs: a random move (never the same twice in a row), height, spin direction, and rest before the next.
      let pick = Math.floor(Math.random() * MOVES.length);
      if (pick === last) pick = (pick + 1 + Math.floor(Math.random() * (MOVES.length - 1))) % MOVES.length;
      last = pick;
      const m = MOVES[pick];
      const k = keyframes(m.h[0] + Math.random() * (m.h[1] - m.h[0]), Math.random() < 0.5 ? 1 : -1, m);
      anims = [
        hop.current!.animate(k.hop, { duration: k.total }),
        spin.current!.animate(k.spin, { duration: k.total }),
      ];
      timer = window.setTimeout(run, k.total + REST_MS * (1 + Math.random() * 4.8)); // rest 2.4-14s, random
    };
    run();
    return () => {
      window.clearTimeout(timer);
      anims.forEach((a) => a.cancel());
    };
  }, [active]);

  return (
    <div className={`tomato-bounce ${active ? "is-active" : ""}`} aria-hidden="true">
      <div
        ref={hop}
        style={{ position: "absolute", right: 0.01, bottom: -0.08, width: 52.992, height: 54.082, display: "flex", alignItems: "center", justifyContent: "center", transformOrigin: "50% 100%" }}
      >
        <div ref={spin} style={{ position: "relative", width: 43.512, height: 45, transform: `rotate(${REST}deg)` }}>
          <img
            alt=""
            src={`${import.meta.env.BASE_URL}assets/c973e.svg`}
            style={{ position: "absolute", inset: "-1.65% 0 -2.22% -6.89%", width: "106.89%", height: "103.87%", maxWidth: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
