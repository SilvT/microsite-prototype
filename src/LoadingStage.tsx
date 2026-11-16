import { useEffect, useRef, useState } from "react";
import { flyHeaderToLanding } from "./handoff";
import LoadingAnimation from "./LoadingAnimation";
import { END, ENTER_DURATIONS, ENTER_EASINGS, SPEED, frameAt } from "./timeline";

type Frame = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";

/**
 * The loading intro, run from a single requestAnimationFrame clock (so motion is continuous
 * instead of one CSS transition per frame). Changing `runId` replays it from the top.
 */
export default function LoadingStage({ runId, skip, onDone }: { runId: number; skip: boolean; onDone: (done: boolean) => void }) {
  const ref = useRef<HTMLElement>(null);
  const cancelFlight = useRef<() => void>(() => {});
  const [t, setT] = useState(skip ? END : 0);
  const [solo, setSolo] = useState(skip);
  const done = t >= END;
  const frame = frameAt(t);
  const f = Math.min(frame, 11);

  useEffect(() => {
    if (runId === 0 && skip) {
      onDone(true);
      return;
    }
    onDone(false);
    setSolo(false);
    setT(0);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const tt = Math.min(END, (now - t0) * SPEED);
      setT(tt);
      if (tt < END) raf = requestAnimationFrame(tick);
      else {
        cancelFlight.current = flyHeaderToLanding(ref.current!); // logo + greeting glide into place...
        onDone(true); // ...as the rest of the landing page fades in
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      cancelFlight.current();
    };
  }, [runId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setSolo(true), 3000);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <section
      ref={ref}
      className={`loading-stage ${done ? "is-complete" : ""} ${solo ? "is-solo" : ""}`}
      style={
        {
          "--frame-duration": `${ENTER_DURATIONS[f] / SPEED}ms`,
          "--frame-easing": ENTER_EASINGS[f],
        } as React.CSSProperties
      }
      aria-label="Loading your Tomato Energy account"
      aria-hidden={done}
    >
      <LoadingAnimation property1={String(f) as Frame} className="loading-canvas" soloTomato={solo} t={t} />
    </section>
  );
}
