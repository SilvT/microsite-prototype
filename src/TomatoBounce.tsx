import { useEffect, useRef } from "react";
import { bounce, clamp, ease, lerp } from "./motion";

const REST = 13.8; // resting tilt (deg), as in the design
const RISE = 420; // ms to the top of the hop; gravity is symmetric so the fall takes as long
const SQUAT = 160; // crouch before the jump
const ELASTIC = 0.5; // landing bounciness: each rebound is half as fast, a quarter as high
const REBOUNDS = 4;
const TAIL = 2 * ELASTIC * RISE * ((1 - ELASTIC ** REBOUNDS) / (1 - ELASTIC)) + 120; // all rebounds + a moment to settle

type Pose = { y: number; sx: number; sy: number; rot: number };

/** The pose `tau` ms into a hop of height `H` (px), spinning in direction `dir` (+1 / -1). */
function pose(tau: number, H: number, dir: number): Pose {
  const air = 2 * RISE;
  let y = 0, sx = 1, sy = 1;
  if (tau < SQUAT) {
    // crouch: a little squash, sinking slightly
    const u = ease.inOut(tau / SQUAT);
    y = 3 * u; sx = 1 + 0.08 * u; sy = 1 - 0.14 * u;
  } else if (tau < SQUAT + RISE) {
    // launch: decelerating rise (quadratic ease-out is exactly gravity), stretched while fast
    const u = (tau - SQUAT) / RISE;
    const from = ease.inOut(clamp(u / 0.2)); // out of the crouch, into the stretch
    y = lerp(3, -H, 1 - (1 - u) ** 2);
    sx = lerp(1.08, 1 - 0.05 * (1 - u), from); sy = lerp(0.86, 1 + 0.1 * (1 - u), from);
  } else {
    // fall from the top, then damped elastic rebounds; squash on every impact, stretch with speed
    const b = bounce(tau - SQUAT - RISE, RISE, ELASTIC, REBOUNDS);
    y = -H * (1 - b.p);
    sx = 1 + 0.22 * b.q - 0.05 * b.s; sy = 1 - 0.3 * b.q + 0.1 * b.s;
  }
  // steady spin while airborne, then a small damped wobble from the impact
  const spin = dir * 360 * clamp((tau - SQUAT) / air);
  const landed = Math.max(0, tau - SQUAT - air);
  const wobble = dir * 9 * Math.exp(-landed / 220) * Math.sin(landed / 65);
  return { y, sx, sy, rot: REST + spin + wobble };
}

/** Sampled keyframes for one hop (the physics is not a simple easing, so we sample it). */
function keyframes(H: number, dir: number) {
  const total = SQUAT + 2 * RISE + TAIL;
  const n = Math.ceil(total / 16);
  const hop: Keyframe[] = [], spin: Keyframe[] = [];
  for (let i = 0; i <= n; i++) {
    const p = pose((total * i) / n, H, dir);
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
    const run = () => {
      // Every hop is a little different: height, spin direction, and a random rest before the next one.
      const k = keyframes(50 + Math.random() * 22, Math.random() < 0.5 ? 1 : -1);
      anims = [
        hop.current!.animate(k.hop, { duration: k.total }),
        spin.current!.animate(k.spin, { duration: k.total }),
      ];
      timer = window.setTimeout(run, k.total + 1200 + Math.random() * 5800);
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
            src="/assets/c973e.svg"
            style={{ position: "absolute", inset: "-1.65% 0 -2.22% -6.89%", width: "106.89%", height: "103.87%", maxWidth: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
