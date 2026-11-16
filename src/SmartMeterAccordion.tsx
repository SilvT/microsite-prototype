import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { UserContext } from "./user";

const A = (n: string) => `/assets/${n}`;
const frames = (...ids: string[]) => ids.map((i) => A(`${i}.svg`));
// Frame-by-frame loops exported from Figma (frame times are approximations)
const SPINNER = frames("38673", "2d8a8", "5734b", "e9bef", "80d97", "36956", "3c0a2", "a8393");
const SUN = frames("6b911", "ab4d5", "8c0ea", "1c176");
const TOMATO = frames("19dba", "7165d", "b516f");

function Loop({ src, ms, className }: { src: string[]; ms: number; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % src.length), ms);
    return () => clearInterval(t);
  }, [src, ms]);
  return <img alt="" src={src[i]} className={className} />;
}
const B = "font-['Plus_Jakarta_Sans:Bold'] font-bold";
const M = "font-['Plus_Jakarta_Sans:Medium'] font-medium";
const R = "font-['Plus_Jakarta_Sans:Regular']";

// ---- data ---------------------------------------------------------------
type Block =
  | { t: "banner"; text: string; date: string; tone: "amber" | "lime" }
  | { t: "title"; text: string; accent?: string; icon?: string }
  | { t: "chips"; items: string[]; at: number; bad?: boolean }
  | { t: "err"; text: string }
  | { t: "p"; text: string; small?: boolean }
  | { t: "checks"; items: [string, "on" | "off" | "dim"][] }
  | { t: "date"; label: string; tone: "amber" | "lime" }
  | { t: "buttons"; primary: string; secondary?: string }
  | { t: "contact" }
  | { t: "mywatts" }
  | { t: "spinner" }
  | { t: "mascot"; src: string[]; ms: number };

type Step = { pct: number; open: number; body: Block[]; err?: "red" };

export type Scenario = "smart" | "trad" | "objected" | "switchError" | "technical" | "cancelled" | "payment";
export const ScenarioContext = createContext<Scenario>("smart");
export const SCENARIO_LABELS: Record<Scenario, string> = {
  smart: "Smart meter",
  trad: "Traditional meter",
  objected: "Objected",
  switchError: "Error during switch",
  technical: "Technical issue",
  cancelled: "Cancel switch",
  payment: "Payment data error",
};


const SECTIONS = ["Application received", "Switching", "Supply starts", "Meter reading", "Switch completed"];
const SWITCH_CHIPS = ["Initiated", "Pending", "In progress", "Approved"];
const SMETS_CHECKS = ["Smart meter identified", "Connect to your smart meter", "Meter reading completed", "Data is flowing"];
const bill = { t: "banner", text: "Your first bill will be issued:", date: "DD/MM/YY", tone: "lime" } as const;
const days = (tone: "amber" | "lime") => ({ t: "banner", text: "Days left to supply date:", date: "DD", tone }) as const;
const checks = (labels: string[], states: ("on" | "off" | "dim")[]): Block => ({
  t: "checks",
  items: labels.map((l, i) => [l, states[i]]),
});

const shared: Step[] = [
  { pct: 10, open: 0, body: [
    { t: "title", text: "Thanks for choosing", accent: "Tomato Energy" },
    { t: "p", text: "We've received your switch request and are preparing to start the process." },
    { t: "spinner" },
  ] },
  { pct: 20, open: 1, body: [
    days("amber"),
    { t: "title", text: "Your Switch is on its way" },
    { t: "chips", items: SWITCH_CHIPS, at: 0 },
    { t: "p", text: "We've officially started your switch with the industry systems." },
  ] },
  { pct: 30, open: 1, body: [
    days("amber"),
    { t: "title", text: "Your Switch is on its way" },
    { t: "chips", items: SWITCH_CHIPS, at: 1 },
    { t: "p", text: "We've sent the notification to your previous supplier." },
    checks(["Notify previous supplier.", "Your previous supplier has approved the switch"], ["off", "off"]),
  ] },
  { pct: 40, open: 1, body: [
    days("amber"),
    { t: "title", text: "Your Switch is on its way" },
    { t: "chips", items: SWITCH_CHIPS, at: 2 },
    { t: "p", text: "Everything is ready. Now we just have to wait…" },
    checks(["Notify previous supplier.", "Your previous supplier has approved the switch"], ["on", "off"]),
  ] },
  { pct: 50, open: 1, body: [
    days("lime"),
    { t: "title", text: "Good News!", icon: "9d1d1" },
    { t: "chips", items: SWITCH_CHIPS, at: 3 },
    { t: "p", text: "We're getting ready to take over your supply." },
  ] },
  { pct: 60, open: 2, body: [
    { t: "title", text: "Your switch is", accent: "Tomato Ready!" },
    { t: "mascot", src: SUN, ms: 362 },
    { t: "date", label: "Your Switch:", tone: "amber" },
    { t: "p", text: "We're excited to start providing you with energy very soon." },
    { t: "p", small: true, text: "Next, we will need your meter reading to make sure your first bill with us is correct." },
  ] },
];

const done: Step = { pct: 100, open: 4, body: [
  { t: "title", text: "Sit back and relax…", icon: "3a57a" },
  { t: "p", text: "It's all done. Your switch is now complete and we're supplying your energy." },
  { t: "mascot", src: TOMATO, ms: 423 },
  { t: "date", label: "Your first bill will arrive:", tone: "lime" },
  { t: "contact" },
] };

const smartTail: Step[] = [
  { pct: 70, open: 3, body: [
    bill, { t: "title", text: "Collecting data" },
    { t: "chips", items: ["Connecting", "Reading", "Data collected"], at: 0 },
    { t: "p", text: "To ensure accurate billing, we are connecting to your smart meter (SMETS)." },
    checks(SMETS_CHECKS, ["on", "off", "off", "off"]),
  ] },
  { pct: 80, open: 3, body: [
    bill, { t: "title", text: "Collecting data" },
    { t: "chips", items: ["Connecting", "Reading", "Data collected"], at: 1 },
    { t: "p", text: "Hold tight while we get your Smart Meter Data, this can take up to 2 weeks before your data will start to appear." },
    checks(SMETS_CHECKS, ["on", "on", "dim", "off"]),
    { t: "mywatts" },
  ] },
  { pct: 90, open: 3, body: [
    bill, { t: "title", text: "Reading completed!", icon: "5abe9" },
    { t: "chips", items: ["Connecting", "Reading", "Data collected"], at: 2 },
    checks(SMETS_CHECKS, ["on", "on", "on", "on"]),
    { t: "p", text: "From this moment onwards your readings will reach us automatically." },
    { t: "mywatts" },
  ] },
];

const tradTail: Step[] = [
  { pct: 70, open: 3, body: [
    bill, { t: "title", text: "Perfect billing" },
    { t: "p", text: "To ensure accurate billing, please submit your meter reading by [date]." },
    { t: "buttons", primary: "Submit meter reading", secondary: "Contact us" },
  ] },
  { pct: 90, open: 3, body: [
    bill, { t: "title", text: "Perfect billing" },
    { t: "p", text: "To ensure accurate billing, please submit your meter reading by [date]." },
    checks(["Meter reading submitted", "Your reading is on our system"], ["on", "dim"]),
    { t: "buttons", primary: "Update your reading", secondary: "Contact us" },
  ] },
];

const uhoh = { t: "title", text: "Uh-oh…", icon: "8f1d2" } as const; // warning triangle
const uhohSeal = { t: "title", text: "Uh-oh…", icon: "dbe0a" } as const; // seal warning
const prev = ["Notify previous supplier.", "Your previous supplier has approved the switch"];
const contact = { t: "buttons", primary: "Contact us" } as const;
const sw = (body: Block[]): Step[] => [{ pct: 0, open: 1, err: "red", body }];

export const SCENARIOS: Record<Scenario, Step[]> = {
  smart: [...shared, ...smartTail, done],
  trad: [...shared, ...tradTail, done],
  objected: sw([
    uhoh,
    { t: "chips", items: ["In progress", "Objected", "Approved"], at: 1, bad: true },
    checks([prev[0]], ["on"]),
    { t: "err", text: "Your switch has been *objected*." },
    checks([prev[1]], ["dim"]),
    { t: "p", text: "We can't complete your switch at the moment." },
    { t: "p", small: true, text: "Come back to us when you are ready." },
  ]),
  switchError: sw([
    uhohSeal,
    { t: "chips", items: ["In progress", "!", "Approved"], at: 1, bad: true },
    { t: "err", text: "There's been an *error* during your switch." },
    { t: "p", text: "We can't complete your switch at the moment. Come back to us when you are ready." },
    { t: "p", small: true, text: "Please, *get in contact* with us to solve this issue." },
    checks(prev, ["dim", "dim"]),
    contact,
  ]),
  technical: sw([
    uhohSeal,
    { t: "chips", items: ["In progress", "!", "Approved"], at: 1, bad: true },
    { t: "err", text: "We've run into some *technical issues* during your switch. Get in contact with us!" },
    { t: "p", text: "Unfortunately we've hit a problem and *need more information* to complete your switch." },
    { t: "p", small: true, text: "Get in contact to solve this issue." },
    checks(prev, ["dim", "dim"]),
    contact,
  ]),
  cancelled: sw([
    { t: "title", text: "Oh no.", icon: "21b35" },
    { t: "chips", items: ["In progress", "Cancelled"], at: 1, bad: true },
    { t: "err", text: "It looks like you've *cancelled*" },
    { t: "p", text: "We would love you to continue your switch to us." },
    { t: "p", small: true, text: "If you *do not wish to cancel*, please contact us" },
    contact,
  ]),
  payment: [{ pct: 0, open: 0, err: "red", body: [
    { t: "title", text: "Uh-oh…", icon: "5a337" },
    { t: "err", text: "There's been an issue with your *payment data*." },
    { t: "p", text: "Please, *get in contact* with us to help you out." },
    contact,
  ] }],
};

// ---- blocks -------------------------------------------------------------
// "*word*" renders as red bold text
const rich = (t: string) =>
  t.split("*").map((x, i) => (i % 2 ? <span key={i} className={`${B} text-[#e0402f]`}>{x}</span> : x));
const tones = {
  amber: "bg-[#fbe9c8] text-[#c9801a]",
  lime: "bg-[#ecf4c4] text-[#00794f]",
};

function Check({ s }: { s: "on" | "off" | "dim" }) {
  const box = s === "off" ? "border-[rgba(0,74,75,0.2)]" : s === "on" ? "border-[#00b57d]" : "border-[rgba(0,74,75,0.15)] bg-[#e4e8e8]";
  return (
    <span className={`size-5 shrink-0 border ${box} flex items-center justify-center`}>
      {s === "on" && <span className="size-2.5 bg-[#00b57d]" />}
      {s === "dim" && <span className="size-2.5 bg-[#cfd6d6]" />}
    </span>
  );
}

function Checks({ items, live }: { items: [string, "on" | "off" | "dim"][]; live: boolean }) {
  const [st, setSt] = useState(items.map(([, v]) => v));
  const toggle = (i: number) => setSt((a) => a.map((x, j) => (j === i ? (x === "on" ? "off" : "on") : x)));
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map(([l], i) => (
        <li key={l}>
          <button
            type="button"
            role="checkbox"
            aria-checked={st[i] === "on"}
            disabled={!live}
            onClick={() => toggle(i)}
            className={`${R} flex w-full items-center gap-3 text-left text-[12px] text-[#4d7a7a] outline-none focus-visible:ring-2 focus-visible:ring-[#004a4b] enabled:cursor-pointer`}
          >
            <Check s={st[i]} />
            {l}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Arrow chips: click one, or swipe/scroll the row sideways. The active chip scrolls into view.
function Chips({ b, onPick }: { b: Extract<Block, { t: "chips" }>; onPick?: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const c = el?.children[b.at] as HTMLElement | undefined;
    if (el && c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  }, [b.at]);
  return (
    <div ref={ref} className="relative flex snap-x overflow-x-auto overflow-y-hidden p-0.5 text-[9px] uppercase [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {b.items.map((c, i) => {
        const last = !b.bad && i === b.items.length - 1 && b.at === i && b.items.length === 4;
        const [fill, edge] =
          b.bad && i === b.at ? ["bg-[#ffd9d4] text-[#e0402f]", "#e0402f"]
          : i === b.at ? (last ? ["bg-[#c4e900] text-[#004a4b]", "#9bb800"] : ["bg-[#00b57d] text-white", "#00b57d"])
          : i < b.at ? [b.bad ? "bg-[#d9f0e6] text-[#00b57d]" : "bg-[#e0f4ec] text-[#00b57d]", "#9fdcc6"]
          : ["bg-[#eef1f1] text-[#a5b5b5]", "#d9dfdf"];
        const Tag = onPick && !b.bad ? "button" : "span";
        // drop-shadow follows the clipped arrow, so the edge (and focus ring) hugs the whole shape
        return (
          <Tag
            key={c}
            type={Tag === "button" ? "button" : undefined}
            onClick={Tag === "button" ? () => onPick!(i) : undefined}
            style={{ "--edge": edge, zIndex: b.items.length - i } as React.CSSProperties}
            className={`${i ? "-ml-1.5" : ""} relative shrink-0 snap-center outline-none focus-visible:z-20! ${Tag === "button" ? "cursor-pointer" : ""} [filter:drop-shadow(1px_0_0_var(--edge))_drop-shadow(-1px_0_0_var(--edge))_drop-shadow(0_1px_0_var(--edge))_drop-shadow(0_-1px_0_var(--edge))] focus-visible:[filter:drop-shadow(2px_0_0_#004a4b)_drop-shadow(-2px_0_0_#004a4b)_drop-shadow(0_2px_0_#004a4b)_drop-shadow(0_-2px_0_#004a4b)]`}
          >
            <span className={`${B} block whitespace-nowrap py-1.5 pl-4 pr-4 transition-colors duration-[345ms] [clip-path:polygon(0_0,calc(100%-8px)_0,100%_50%,calc(100%-8px)_100%,0_100%,8px_50%)] ${fill}`}>
              {c}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}

const HEADER_SHIFT = 30; // px the header slides up, ~12% of its height; keeps the logo clear of the notch

// ---- demo popups: explain what each action would do in the real product ----------------
type Popup = "meter" | "contact" | "phone" | "mywatts";
const POPUPS: Record<Popup, { title: string; text: string; target: string }> = {
  meter: {
    title: "Submit meter reading",
    text: "Redirects to the customer's profile page on the company's account area, where they enter their meter reading.",
    target: "→ /account/profile/meter-reading",
  },
  contact: {
    title: "Contact us",
    text: "A mailto: link that opens the customer's email app, addressed to the company's customer care team.",
    target: "mailto:customer.care@tomato.energy",
  },
  phone: {
    title: "Call us",
    text: "A tel: link that starts a call to the company's customer care line.",
    target: "tel:012 5664 4046",
  },
  mywatts: {
    title: "myWatts app",
    text: "Links to the company's own energy consumption tracker app, on Google Play or the Apple App Store, to download.",
    target: "→ Google Play · App Store",
  },
};
const popupFor = (label: string): Popup => (/contact/i.test(label) ? "contact" : "meter");

function PopupDialog({ kind, onClose }: { kind: Popup; onClose: () => void }) {
  const { title, text, target } = POPUPS[kind];
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus({ preventScroll: true }), []); // plain autoFocus can scroll the frame
  // Portal into the phone frame: a transformed ancestor (the sliding header) would otherwise shrink a fixed overlay.
  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation(); // keep arrow keys from stepping the journey behind the dialog
          if (e.key === "Escape") onClose();
        }}
        className="w-full max-w-[300px] rounded-2xl bg-white p-5 text-center shadow-2xl"
      >
        <h3 className={`${B} text-[16px] text-[#004a4b]`}>{title}</h3>
        <p className={`${R} mt-2 text-[13px] leading-5 text-[#324a5e]`}>{text}</p>
        <p className={`${M} mt-3 rounded-md bg-[#eef1f1] px-2 py-1.5 text-[11px] text-[#4d7a7a]`}>{target}</p>
        <p className={`${R} mt-3 text-[11px] text-[#4d7a7a]`}>Prototype only: nothing opens.</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className={`${B} mt-4 w-full cursor-pointer rounded-full bg-[#004a4b] py-2.5 text-[14px] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#00b57d] focus-visible:ring-offset-2`}
        >
          Got it
        </button>
      </div>
    </div>,
    document.querySelector(".app-shell") ?? document.body,
  );
}

function Render({ b, onChip, live, open }: { b: Block; onChip?: (i: number) => void; live: boolean; open: (k: Popup) => void }) {
  const user = useContext(UserContext);
  switch (b.t) {
    case "banner":
      return (
        <p className={`${M} ${tones[b.tone]} rounded-md py-1 text-center text-[11px]`}>
          {b.text} <span className={B}>{b.date === "DD" ? user.daysLeft : user.billDate}</span>
        </p>
      );
    case "title":
      return (
        <h3 className={`${B} flex items-start gap-1.5 text-[14px] leading-5 text-[#004a4b]`}>
          {b.icon && <img alt="" src={A(`${b.icon}.svg`)} className="size-5 shrink-0" />}
          <span>{b.text} {b.accent && <span className="text-[#ff4f3d]">{b.accent}</span>}</span>
        </h3>
      );
    case "chips":
      return <Chips b={b} onPick={onChip} />;
    case "p":
      return <p className={`${R} ${b.small ? "text-center text-[11px] text-[#4d7a7a]" : "text-[14px] text-[#004a4b]"}`}>{b.text.includes("[date]") ? <>{b.text.split("[date]")[0]}<strong className={B}>{user.meterDate}</strong>{b.text.split("[date]")[1]}</> : rich(b.text)}</p>;
    case "err":
      return <p className={`${R} rounded-md bg-[#fbeae6] px-2 py-1.5 text-[12px] text-[#004a4b]`}>{rich(b.text)}</p>;
    case "checks":
      return <Checks items={b.items} live={live} />;
    case "date":
      return (
        <p className={`${M} self-center rounded-md px-5 py-2 text-center text-[12px] ${b.tone === "amber" ? "bg-[#ffc233] text-[#7a4e00]" : "bg-[#c4e900] text-[#004a4b]"}`}>
          {b.label}
          <br />
          <span className={B}>{b.label.startsWith("Your Switch") ? user.switchDate : user.billDate}</span>
        </p>
      );
    case "buttons":
      return (
        <div className="flex flex-col items-center gap-2">
          <button type="button" onClick={() => open(popupFor(b.primary))} className={`${B} w-52 cursor-pointer rounded-full bg-[#004a4b] py-2.5 text-[14px] text-white`}>{b.primary}</button>
          {b.secondary && <button type="button" onClick={() => open(popupFor(b.secondary!))} className={`${B} w-52 cursor-pointer rounded-full border-2 border-[#004a4b] py-2 text-[14px] text-[#004a4b] outline-none focus-visible:ring-2 focus-visible:ring-[#00b57d] focus-visible:ring-offset-2`}>{b.secondary}</button>}
        </div>
      );
    case "contact":
      return (
        <div className="flex flex-col items-center gap-2">
          <p className={`${R} text-[12px] text-[#4d7a7a]`}>Remember you can always contact us for any concern at:</p>
          <div className="flex gap-2 text-lg">
            <button type="button" aria-label="Call us" onClick={() => open("phone")} className="flex h-10 w-[70px] cursor-pointer items-center justify-center rounded-full bg-[#004a4b] outline-none focus-visible:ring-2 focus-visible:ring-[#00b57d] focus-visible:ring-offset-2"><img alt="" src={A("e9b53.svg")} className="size-[30px]" /></button>
            <button type="button" aria-label="Email us" onClick={() => open("contact")} className="flex h-10 w-[70px] cursor-pointer items-center justify-center rounded-full border border-[rgba(0,74,75,0.2)] outline-none focus-visible:ring-2 focus-visible:ring-[#00b57d] focus-visible:ring-offset-2"><img alt="" src={A("5a332.svg")} className="size-6" /></button>
          </div>
        </div>
      );
    case "mywatts":
      return (
        <button type="button" onClick={() => open("mywatts")} className="w-full cursor-pointer rounded-2xl bg-[#004a4b] p-3 text-left text-[#c2ea00] outline-none focus-visible:ring-2 focus-visible:ring-[#00b57d] focus-visible:ring-offset-2">
          <img alt="myWatts" src={A("82048.svg")} className="block" />
          <p className={`${M} mt-2 text-[11px] leading-4 text-[#c2ea00]`}>Check into MyWatts regularly to track your energy consumption</p>
        </button>
      );
    case "spinner":
      return <Loop src={SPINNER} ms={133} className="mx-auto size-8" />;
    case "mascot":
      return <Loop src={b.src} ms={b.ms} className="mx-auto h-16" />;
  }
}

// ---- component ----------------------------------------------------------
function Row({ i, open, label, err, onClick }: { i: number; open: number; label: string; err?: "red"; onClick: () => void }) {
  const state = i < open ? "done" : i === open ? "open" : "todo";
  return (
    <button onClick={onClick} className="flex w-full items-center gap-2 border-b border-[rgba(0,74,75,0.15)] bg-[#f8f8f8] px-5 py-2.5 text-left">
      {state === "open" && err ? (
        <span className={`flex size-4 items-center justify-center rounded-full border border-dashed border-[#ff4740] bg-[rgba(255,71,64,0.07)] text-[9px] text-[#d03721] ${B}`}>!</span>
      ) : i === 2 && state !== "todo" ? (
        <img alt="" src={A("37a8c.svg")} className="size-4" />
      ) : i === 4 && state === "open" ? (
        <img alt="" src={A("7c237.svg")} className="size-4" />
      ) : state === "done" ? (
        <img alt="" src={A("aee07.svg")} className="size-3.5" />
      ) : (
        <span className={`flex size-4 items-center justify-center rounded-full border text-[9px] text-[#004a4b] ${state === "open" ? "border-dashed border-[#00b57d]" : "border-[rgba(0,74,75,0.3)]"}`}>{i + 1}</span>
      )}
      <span className={`${B} flex-1 text-[10px] uppercase text-[#004a4b]`}>{label}</span>
      <img alt="" src={A("9cec1.svg")} className={`size-5 ${state === "open" ? "rotate-180" : ""}`} />
    </button>
  );
}

// First step per section, used when a row is tapped.
const firstStepOf = (steps: Step[], section: number) => Math.max(0, steps.findIndex((s) => s.open === section));

export default function SmartMeterAccordion({ className = "" }: { className?: string }) {
  const steps = SCENARIOS[useContext(ScenarioContext)];
  const [n, setN] = useState(0);
  const [popup, setPopup] = useState<Popup | null>(null);
  const step = steps[Math.min(n, steps.length - 1)];
  // Jump to the step of the same section whose chip row highlights chip i.
  const goChip = (i: number) =>
    setN((v) => {
      const k = steps.findIndex((x) => x.open === step.open && x.body.some((b) => b.t === "chips" && !b.bad && b.at === i));
      return k < 0 ? v : k;
    });
  // Scrolling the accordion slides the page header up (max HEADER_SHIFT px) so the content gets more room.
  // The header stays in view; the progress bar is sticky.
  const landing = () => document.querySelector<HTMLElement>(".landing-screen");
  const onScroll = (e: React.UIEvent<HTMLDivElement>) =>
    landing()?.style.setProperty("--hdr-shift", `${Math.min(1, e.currentTarget.scrollTop / 60) * HEADER_SHIFT}px`);
  useEffect(() => () => landing()?.style.setProperty("--hdr-shift", "0px"), []);
  const go = (d: number) => setN((v) => Math.min(steps.length - 1, Math.max(0, v + d)));

  return (
    <div className={`smart-meter-interactive ${className}`} tabIndex={0} onScroll={onScroll} onKeyDown={(e) => (e.key === "ArrowRight" ? go(1) : e.key === "ArrowLeft" ? go(-1) : null)}>
      {!step.err && <>
      <div className="sticky top-0 z-10 -mx-2 bg-white px-2 pb-2">
      <div className="relative h-7 overflow-hidden rounded-md border border-[#00b57d] bg-[rgba(0,181,125,0.05)]">
        <div className={`${B} absolute inset-y-0 left-0 flex items-center justify-between bg-[#00b57d] px-2 text-[10px] text-white transition-[width] duration-[575ms]`} style={{ width: `${step.pct}%`, minWidth: 40, paddingRight: step.pct >= 90 ? 28 : undefined }}>
          {step.pct > 10 && <img alt="" src={A("f51a7.svg")} className="mr-auto size-3.5" />}
          <span className={step.pct > 10 ? "ml-auto" : ""}>{step.pct}%</span>
        </div>
        <img alt="" src={A(step.pct === 100 ? "a58aa.svg" : "2a445.svg")} className="absolute right-1 top-1/2 h-[18px] -translate-y-1/2" />
      </div>
      </div>
      <p className={`${M} mb-3 mt-1 text-[10px] text-[#004a4b]`}>Follow the progress of your switch:</p>
      </>}
      <div className="overflow-hidden rounded-[20px] bg-[#f8f8f8] shadow-[0_4px_5px_rgba(0,0,0,0.1)]">
        {SECTIONS.map((label, i) => (
          <div key={label}>
            <Row i={i} open={step.open} err={step.err} label={i === 0 && n === 0 && !step.err ? "Submitted application" : label} onClick={() => setN(firstStepOf(steps, i))} />
            {i === step.open && (
              <div key={step.open} className="flex animate-[fade_345ms_ease-out] flex-col gap-3 px-5 py-4">
                {step.body.map((b, k) => <Render key={b.t === "checks" ? `${n}-${k}` : k} b={b} live={!step.err} open={setPopup} onChip={step.err ? undefined : goChip} />)}
              </div>
            )}
          </div>
        ))}
      </div>
      {popup && <PopupDialog kind={popup} onClose={() => setPopup(null)} />}
    </div>
  );
}
