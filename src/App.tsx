import { useState } from "react";
import LoadingStage from "./LoadingStage";
import Microsite from "./Microsite";
import { UserContext, DEFAULT_USER, makeUser } from "./user";
import { ScenarioContext, SCENARIO_LABELS, type Scenario } from "./SmartMeterAccordion";

type UserType = "smart" | "trad";
type ErrorState = Exclude<Scenario, UserType>;
const USER_TYPES: UserType[] = ["smart", "trad"];
const ERRORS = (Object.keys(SCENARIO_LABELS) as Scenario[]).filter((k): k is ErrorState => !USER_TYPES.includes(k as UserType));


// Selected look per option: user types get their own greens from the design, error states stay dark teal.
const ON_TEAL = "bg-[#004a4b] text-white";
const ON_TYPE: Record<UserType, string> = {
  smart: "bg-[#007d56] text-white", // green/dark
  trad: "bg-[#c2ea00] text-[#004a4b]", // lime
};

function Option({ on, onClick, children, onClass = ON_TEAL }: { on: boolean; onClick: () => void; children: React.ReactNode; onClass?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-lg px-3 py-1.5 text-left ${on ? onClass : "text-[#004a4b] hover:bg-[#eef1f1]"}`}
    >
      {children}
    </button>
  );
}

export default function App() {
  // ?intro=0 opens straight on the landing page; the Play button replays the intro any time
  const skipIntro = new URLSearchParams(location.search).get("intro") === "0";
  const [done, setDone] = useState(skipIntro); // intro finished: landing page visible
  const [runId, setRunId] = useState(0); // bump to replay the intro
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(DEFAULT_USER);
  // User type (which journey) and error state (overrides the journey screen) are independent choices.
  // ?scenario=trad|objected|... still works as a shortcut link.
  const q = new URLSearchParams(location.search).get("scenario") as Scenario;
  const [meter, setMeter] = useState<UserType>(q === "trad" ? "trad" : "smart");
  const [error, setError] = useState<ErrorState | null>(ERRORS.includes(q as ErrorState) ? (q as ErrorState) : null);
  const scenario: Scenario = error ?? meter;

  // Replays the loading animation from the top. Nothing else resets, so it ends back where you were.
  const play = () => setRunId((r) => r + 1);
  const pick = (fn: () => void) => () => {
    fn();
    setOpen(false);
  };
  const list = (
    <>
      <p className="mb-1 font-semibold uppercase tracking-wide text-[#4d7a7a]">User type</p>
      {USER_TYPES.map((k) => (
        <Option key={k} on={k === meter} onClass={ON_TYPE[k]} onClick={pick(() => { setMeter(k); setError(null); })}>
          {SCENARIO_LABELS[k]}
        </Option>
      ))}
      <p className="mb-1 mt-3 font-semibold uppercase tracking-wide text-[#4d7a7a]">Error state</p>
      <Option on={error === null} onClick={pick(() => setError(null))}>None</Option>
      {ERRORS.map((k) => (
        <Option key={k} on={k === error} onClick={pick(() => setError(k))}>
          {SCENARIO_LABELS[k]}
        </Option>
      ))}
      <button
        onClick={pick(play)}
        className="mt-3 flex items-center gap-2 rounded-lg bg-[#004a4b] px-3 py-1.5 text-left font-semibold text-white"
      >
        <svg aria-hidden width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
          <path d="M0 0v12l10-6z" />
        </svg>
        Play loading animation
      </button>
      <button
        onClick={pick(() => {
          setUser(makeUser());
        })}
        className="rounded-lg border border-[#004a4b] px-3 py-1.5 text-left text-[#004a4b] hover:bg-[#eef1f1]"
      >
        New random user
      </button>
      <p className="mt-3 w-0 min-w-full text-[11px] leading-4 text-[#4d7a7a]">
        <strong className="font-semibold">Demo note:</strong> a few interactions are added for display only, such as tapping the
        Switching and Meter reading sub-steps, or ticking the checkboxes. In the real product these update automatically from
        backend data, and the checkboxes are never interactive to the user.
      </p>
    </>
  );

  return (
    <UserContext.Provider value={user}>
    <ScenarioContext.Provider value={scenario}>
    <main className="app-shell" aria-live="polite">
      <section className={`landing-screen ${done ? "is-visible" : ""}`} aria-hidden={!done}>
        <Microsite key={scenario} />
      </section>
      <LoadingStage runId={runId} skip={skipIntro} onDone={setDone} />
    </main>
    <nav aria-label="Prototype scenarios" className="fixed left-8 top-1/2 hidden max-h-[calc(100dvh-32px)] -translate-y-1/2 flex-col gap-1 overflow-y-auto text-[13px] min-[900px]:flex">
      {list}
    </nav>
    <div className="min-[900px]:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-3 left-3 z-40 rounded-full bg-[#004a4b] px-3.5 py-2 text-[12px] font-semibold text-white shadow-lg"
      >
        Scenarios
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setOpen(false)}>
          <nav
            aria-label="Prototype scenarios"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 flex max-h-[88%] flex-col gap-1 overflow-y-auto rounded-t-2xl bg-white px-7 pb-8 pt-7 text-[14px] shadow-2xl"
          >
            {list}
          </nav>
        </div>
      )}
    </div>
    </ScenarioContext.Provider>
    </UserContext.Provider>
  );
}
