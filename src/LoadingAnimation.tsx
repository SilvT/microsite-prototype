import { useContext, type CSSProperties } from "react";
import { UserContext } from "./user";
import TomatoBounce from "./TomatoBounce";
import { END, START } from "./timeline";
import { footerTrack, markState, topTrack } from "./motion";

const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const asset = (name: string) => `${assetPathPrefix}/${name}`;

type Frame = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11";

type LoadingAnimationProps = {
  className?: string;
  property1?: Frame;
  soloTomato?: boolean;
  /** Intro clock in design ms. Drives the vertical motion; omit (or END) for the finished state. */
  t?: number;
};

const fill: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "block",
  width: "100%",
  height: "100%",
  maxWidth: "none",
};

const topPosition = (left: string, width: string, height: string, top: string): CSSProperties => ({
  position: "absolute",
  left,
  top,
  width,
  height,
});

const insetPosition = (inset: string): CSSProperties => ({
  position: "absolute",
  inset,
});

const designY = (pixels: number) => `${(pixels / 568) * 100}%`;

function TomatoOne() {
  return (
    <>
      <div style={{ position: "absolute", inset: "20.47% 0 0" }}>
        <img alt="" style={fill} src={asset("3ed10.svg")} />
      </div>
      <div style={{ position: "absolute", inset: "20.73% 21.99% 6.33% 12.91%" }}>
        <img alt="" style={fill} src={asset("e29ba.svg")} />
      </div>
      <div style={{ position: "absolute", inset: "0 24.28% 67.64% 32.12%" }}>
        <img alt="" style={fill} src={asset("bebad.svg")} />
      </div>
    </>
  );
}

function TomatoFive({ footer }: { footer: boolean }) {
  return (
    <div className={footer ? "tomato-five is-footer" : "tomato-five"}>
      <div style={{ position: "absolute", inset: "4.14% 0 0" }}>
        <img alt="" style={fill} src={asset(footer ? "c1ba3.svg" : "bac54.svg")} />
      </div>
      <div style={{ position: "absolute", inset: "4.14% 0 0" }}>
        <img alt="" style={fill} src={asset(footer ? "17331.svg" : "c1880.svg")} />
      </div>
      <div style={{ position: "absolute", inset: "21.74% 10.91% 12.58% 23.57%" }}>
        <img alt="" style={fill} src={asset(footer ? "cec8b.svg" : "15874.svg")} />
      </div>
      <div style={{ position: "absolute", inset: "0 26.61% 57.8% 24.38%" }}>
        <img alt="" style={fill} src={asset(footer ? "a309c.svg" : "7e36a.svg")} />
      </div>
    </div>
  );
}

const tomatoFiveInsets = [
  "-78.35% 31.71% 151.94% 18.13%",
  "-87.15% 31.71% 160.74% 18.13%",
  "-35.21% 31.71% 108.8% 18.13%",
  "-35.21% 31.71% 108.8% 18.13%",
  "-24.3% 31.71% 97.89% 18.13%",
  "-6.16% 31.71% 79.75% 18.13%",
  "2.64% 31.71% 70.95% 18.13%",
  "18.66% 31.71% 54.93% 18.13%",
  "90.85% 4% -8.62% 63.06%",
  "90.85% 4% -8.62% 63.06%",
  "90.85% 4% -8.62% 63.06%",
  "90.85% 4% -8.62% 63.06%",
];

const tomatoSixInsets = [
  "-85.39% 56.76% 158.98% -8.44%",
  "-87.15% 56.76% 160.74% -8.44%",
  "-87.15% 56.76% 160.74% -8.44%",
  "-87.15% 56.76% 160.74% -8.44%",
  "-87.15% 56.76% 160.74% -8.44%",
  "-21.3% 56.76% 94.89% -8.44%",
  "-4.4% 56.76% 77.99% -8.44%",
  "11.62% 56.76% 61.97% -8.44%",
  "88.2% 70.4% -8.09% -8.13%",
  "88.2% 70.4% -8.09% -8.13%",
  "88.2% 70.4% -8.09% -8.13%",
  "88.2% 70.4% -8.09% -8.13%",
];

const tomatoSevenInsets = [
  "-87.15% 17.69% 168.28% 49.38%",
  "-87.2% 17.69% 168.33% 49.38%",
  "-87.2% 17.69% 168.33% 49.38%",
  "-87.2% 17.69% 168.33% 49.38%",
  "-87.2% 17.69% 168.33% 49.38%",
  "-24.82% 17.69% 105.95% 49.38%",
  "-9.68% 17.69% 90.81% 49.38%",
  "6.34% 17.69% 74.79% 49.38%",
  "87.15% 55.55% -2.67% 17.5%",
  "87.15% 55.55% -2.67% 17.5%",
  "87.15% 55.55% -2.67% 17.5%",
  "87.15% 55.55% -2.67% 17.5%",
];

const tomatoEightInsets = [
  "-85.68% 4.58% 171.75% 70.35%",
  "-87.21% 4.58% 173.29% 70.35%",
  "-74.54% 4.58% 160.61% 70.35%",
  "-74.54% 4.58% 160.61% 70.35%",
  "-74.54% 4.58% 160.61% 70.35%",
  "-15.32% 4.58% 101.39% 70.35%",
  "-8.63% 4.58% 94.7% 70.35%",
  "7.39% 4.58% 78.68% 70.35%",
  "92.96% -2.5% -2.48% 85.94%",
  "92.96% -2.5% -2.48% 85.94%",
  "92.96% -2.5% -2.48% 85.94%",
  "92.96% -2.5% -2.48% 85.94%",
];

const tomatoTwoTops = [-323, -495, -300, 0, 89.57, 137, 209, 300, 600, 600, 600, 600];
const sparksTops = [-159, -423, 0, 114, 203.57, 301, 337, 428, 600, 600, 600, 600];
const tomatoFourTops = [-308, -495, -250, -250, -92, 152, 188, 279, 600, 600, 600, 600];
const tomatoThreeTops = [-354, -494.57, -199.57, -99.57, -10, 90, 100, 191, 600.43, 600.43, 600.43, 600.43];
const tomatoOneTops = [-151, -495, 0, 114, 203.57, 309, 345, 436, 600, 600, 600, 600];

// Vertical motion is driven by one clock, not per-frame CSS transitions. Every tomato is a single
// continuous fall (no mid-air pause); `delay` staggers when each one is released (design ms).
const TRACKS = {
  two: topTrack(tomatoTwoTops, { delay: 120, h: 150 }),
  sparks: topTrack(sparksTops, { delay: 180, h: 78.3 }),
  four: topTrack(tomatoFourTops, { delay: 300, h: 120 }),
  three: topTrack(tomatoThreeTops, { delay: 330, h: 139.7 }),
  one: topTrack(tomatoOneTops, { delay: 470, h: 150 }),
  f1: footerTrack(tomatoFiveInsets, { delay: 220 }),
  f2: footerTrack(tomatoSixInsets, { delay: 0 }),
  f3: footerTrack(tomatoSevenInsets, { delay: 400 }),
  f4: footerTrack(tomatoEightInsets, { delay: 520 }),
};

export default function LoadingAnimation({
  className,
  property1 = "0",
  soloTomato = false,
  t = END,
}: LoadingAnimationProps) {
  const user = useContext(UserContext);
  const frame = Number(property1);
  const footer = frame >= 8;
  const animating = t < END;
  const fall: CSSProperties = animating ? { transition: "none" } : {}; // the clock moves these, not CSS transitions
  const footerLayer = (f: { inset: string; q: number }): CSSProperties => ({
    ...insetPosition(f.inset),
    ...(animating
      ? { transition: "none", transformOrigin: "50% 100%", transform: f.q > 0.002 ? `scale(${1 + 0.07 * f.q}, ${1 - 0.11 * f.q})` : undefined }
      : {}),
  });
  const mark = markState(t, START[1]);

  // The mark's whole journey (drop-in, pop, lockup, exit) is clock-driven; elastic squash/stretch while it bounces.
  const markH = (mark.w * 90) / 71.125;
  const symbolStyle: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: `calc(${designY(mark.y)} + var(--notch-offset) * ${mark.n})`,
    width: mark.w,
    height: markH,
    transform: `translate(-50%, -50%) scale(${1 + 0.16 * mark.q - 0.05 * mark.s}, ${1 - 0.22 * mark.q + 0.12 * mark.s})`,
    transformOrigin: "50% 100%",
    transition: "none",
  };
  const markSprite = mark.w > 62 ? "9fb6a.svg" : mark.w > 40 ? "658af.svg" : "119ba.svg";

  return (
    <div className={className || "loading-canvas"} data-frame={frame}>
      <div
        className="motion-layer footer-motion footer-tomato-one"
        style={footerLayer(TRACKS.f1(t))}
      >
        <TomatoFive footer={footer} />
      </div>

      <div
        className="motion-layer non-footer-motion"
        style={{ ...topPosition("128px", "157.248px", "150px", designY(TRACKS.two(t))), ...fall }}
      >
        <img alt="" style={fill} src={asset("24aa9.svg")} />
      </div>

      <div
        className="motion-layer footer-motion footer-tomato-two"
        style={footerLayer(TRACKS.f2(t))}
      >
        <div className={footer ? "footer-tomato tomato-six" : "falling-tomato tomato-six"}>
          <img alt="" style={fill} src={asset(footer ? "631fa.svg" : "cd86d.svg")} />
        </div>
      </div>

      <div className="motion-layer non-footer-motion logo-symbol" style={symbolStyle}>
        <img
          alt="Tomato Energy"
          style={fill}
          src={asset(markSprite)}
        />
      </div>

      <div
        className="motion-layer non-footer-motion"
        style={{ ...topPosition("56px", "62.112px", "78.296px", designY(TRACKS.sparks(t))), ...fall }}
      >
        <img alt="" style={fill} src={asset("5eed6.svg")} />
      </div>

      <div
        className="motion-layer non-footer-motion"
        style={{ ...topPosition("41px", "116px", "120px", designY(TRACKS.four(t))), ...fall }}
      >
        <img alt="" style={fill} src={asset("7612d.svg")} />
      </div>

      <div
        className="motion-layer non-footer-motion"
        style={{ ...topPosition("-17px", "141.804px", "139.709px", designY(TRACKS.three(t))), ...fall }}
      >
        <div className="tomato-three">
          <img alt="" style={fill} src={asset("e4b39.svg")} />
        </div>
      </div>

      <div
        className="motion-layer footer-motion footer-tomato-three"
        style={footerLayer(TRACKS.f3(t))}
      >
        <div className={footer ? "footer-tomato tomato-seven" : "falling-tomato tomato-seven"}>
          <img alt="" style={fill} src={asset(footer ? "d717c.svg" : "f43af.svg")} />
        </div>
      </div>

      <div
        className="motion-layer footer-motion footer-tomato-four"
        style={footerLayer(TRACKS.f4(t))}
      >
        <div className={footer ? "footer-tomato tomato-eight" : "falling-tomato tomato-eight"}>
          <img alt="" style={fill} src={asset(footer ? "c973e.svg" : "60bd7.svg")} />
        </div>
      </div>
      <TomatoBounce active={soloTomato} />

      <div
        className="motion-layer non-footer-motion"
        style={{
          ...topPosition(frame === 1 ? "109px" : "calc(50% + 2px)", "134.784px", "150px", designY(TRACKS.one(t))),
          ...(animating ? { transition: "left 150ms linear" } : {}),
        }}
      >
        <TomatoOne />
      </div>

      {frame >= 9 && (
        <div
          className="reveal-layer wordmark"
          style={{
            position: "absolute",
            inset: frame >= 10 ? "2.64% 23.3% 92.7% 23.44%" : "13.38% 23.3% 81.96% 23.44%",
          }}
        >
          <img alt="Tomato Energy" style={fill} src={asset("338e8.svg")} />
        </div>
      )}

      {frame >= 10 && (
        <p className="reveal-layer greeting">
          <span>Hello, {user.title} </span>
          <strong>{user.surname}</strong>
        </p>
      )}

      {frame === 11 && (
        <p className="reveal-layer thanks">
          Thanks for choosing
          <br />
          Tomato Energy
        </p>
      )}
    </div>
  );
}
