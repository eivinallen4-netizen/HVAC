"use client";

import { useEffect, useRef, useState } from "react";
import {
  booking as bookingText,
  compareBox,
  fees,
  questions,
  repairText,
  replacementText,
  resultText,
  safety,
  urgency,
  zips,
  type Option,
} from "@/lib/estimate/config";
import {
  ageMessage,
  nextStep,
  rangeText,
  repairEstimate,
  replacementEstimate,
  route,
  serviceLabel,
  showCompareBox,
  urgencyFor,
  zipStatus,
  type Answers,
  type RepairResult,
  type ReplacementResult,
  type StepId,
} from "@/lib/estimate/logic";
import { PICK_EVENT, track } from "@/lib/track";
import { BookingEmbed } from "./Booking";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";
import { ChoiceStep, ToolCard } from "./tools/ToolUI";

/** Buttons elsewhere on the site preselect a service. These skip the estimate and open the booking calendar. */
const CALENDAR_PICKS = ["Maintenance / tune-up", "Ductwork / indoor air quality"];

/** Site-wide service picks → starting answers */
const PRESETS: Record<string, Answers> = {
  "AC not cooling": { help: "repair", problem: "nocool" },
  "Heat not working": { help: "repair", problem: "noheat" },
  "System won't turn on / no airflow": { help: "repair" },
  "New system / replacement estimate": { help: "replace" },
  "Ductless mini-split": { system: "minisplit" },
  "Not sure / other": { help: "unsure" },
};

type Undo = { step: StepId; prev: string | undefined };

export function EstimateForm() {
  const [a, setA] = useState<Answers>({});
  const [undo, setUndo] = useState<Undo[]>([]);
  const [seen, setSeen] = useState<Answers>({});
  const [calendar, setCalendar] = useState<string | null>(null);
  const tracked = useRef(false);

  const step = nextStep(a);
  const steps = route(a);
  const isResult = step === null;

  const set = (s: StepId, value: string) => {
    setUndo((u) => [...u, { step: s, prev: a[s] }]);
    setA((p) => ({ ...p, [s]: value }));
    setSeen((p) => ({ ...p, [s]: value }));
  };

  const back = () => {
    const last = undo[undo.length - 1];
    if (!last) return;
    setUndo((u) => u.slice(0, -1));
    setA((p) => {
      const n = { ...p };
      if (last.prev === undefined) delete n[last.step];
      else (n as Record<string, string>)[last.step] = last.prev;
      return n;
    });
  };

  const restart = () => {
    setA({});
    setUndo([]);
    setSeen({});
    tracked.current = false;
  };

  const pick = (service: string) => {
    if (CALENDAR_PICKS.includes(service)) {
      setCalendar(service);
      return;
    }
    setCalendar(null);
    const preset = PRESETS[service] ?? {};
    setA(preset);
    setSeen(preset);
    setUndo([]);
    tracked.current = false;
    track("lead_step", { step: 1, service });
  };

  useEffect(() => {
    const onPick = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_EVENT, onPick);
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre) pick(pre.slice(0, 80));
    return () => window.removeEventListener(PICK_EVENT, onPick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show the full result from its top, now that the card is wider
  useEffect(() => {
    if (!isResult) return;
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!tracked.current) {
      tracked.current = true;
      track("estimate_result", { help: a.help, problem: a.problem, system: a.system, zip_in_area: zipStatus(a.zip) === "in" });
    }
  }, [isResult, a.help, a.problem, a.system, a.zip]);

  if (calendar) {
    return (
      <div className="form-card form-hero is-booking" id="estimate">
        <div className="form-top">
          <span className="kicker">Book online</span>
        </div>
        <h2 className="form-title">Pick a time that works</h2>
        <div className="chosen">
          <span>
            <Icon name="check" size={18} /> {calendar}
          </span>
          <button type="button" onClick={() => setCalendar(null)}>
            Change
          </button>
        </div>
        <BookingEmbed location="hero" service={calendar} onClose={() => setCalendar(null)} />
        <p className="or-call">
          Prefer to talk? <CallLink location="form" icon={false} /> — answered 24/7
        </p>
      </div>
    );
  }

  const idx = step ? steps.indexOf(step) + 1 : steps.length + 1;

  return (
    <ToolCard
      id="estimate"
      className={`form-hero est-form${isResult ? " is-result" : ""}`}
      step={idx}
      total={steps.length}
      label={resultText.kicker}
      onBack={undo.length ? back : undefined}
    >
      {step === "zip" ? (
        <ZipStep initial={seen.zip} onNext={(z) => set("zip", z)} />
      ) : step ? (
        <ChoiceStep
          title={questions[step].title}
          hint={"hint" in questions[step] ? (questions[step] as { hint?: string }).hint : undefined}
          choices={questions[step].options as Option[]}
          selected={seen[step] as string | undefined}
          onPick={(v: string) => set(step, v)}
        />
      ) : (
        <Result
          a={a}
          onCompare={() => {
            track("estimate_compare_click");
            set("help", "compare");
          }}
          onRestart={restart}
        />
      )}
      {!isResult && (
        <p className="or-call">
          Prefer to talk? <CallLink location="form" icon={false} /> — answered 24/7
        </p>
      )}
    </ToolCard>
  );
}

/* ─────────────────────────── ZIP step ─────────────────────────── */
function ZipStep({ initial, onNext }: { initial?: string; onNext: (zip: string) => void }) {
  const [zip, setZip] = useState(initial ?? "");
  const [err, setErr] = useState("");
  return (
    <form
      className="step"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\d{5}$/.test(zip)) {
          setErr(questions.zip.error);
          return;
        }
        track("tool_step", { question: questions.zip.title, answer: zipStatus(zip) });
        onNext(zip);
      }}
    >
      <h2 className="form-title">{questions.zip.title}</h2>
      <label className={`f num-f${err ? " has-err" : ""}`}>
        <span className="f-label">{questions.zip.label}</span>
        <span className="num-wrap">
          <input
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            autoFocus
            value={zip}
            placeholder="89101"
            onChange={(e) => {
              setErr("");
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            }}
          />
        </span>
        {err && <span className="f-err">{err}</span>}
      </label>
      <button type="submit" className="btn btn-red btn-block btn-lg">
        See My Estimate <Icon name="arrow" size={20} />
      </button>
    </form>
  );
}

/* ─────────────────────────── Result ─────────────────────────── */
function Result({ a, onCompare, onRestart }: { a: Answers; onCompare: () => void; onRestart: () => void }) {
  const r = repairEstimate(a);
  const n = replacementEstimate(a);
  const u = urgencyFor(a);
  const age = ageMessage(a);
  const zip = zipStatus(a.zip);

  return (
    <div className="step est-result">
      <h2 className="form-title">{resultText.title}</h2>

      {/* 1–2. Estimates, causes, "technician confirms" */}
      <div className={`est-cols${r && n ? " two" : ""}`}>
        {r && <RepairBlock r={r} />}
        {n && <ReplaceBlock n={n} />}
      </div>

      {/* 3. Diagnostic visit */}
      {r && (
        <div className="est-box est-diag">
          <Icon name="tag" size={20} />
          <div>
            <b>{fees.diagnosticTitle}</b>
            <ul>
              {fees.diagnosticLines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 4. Urgency, what to check, safety */}
      {u && (
        <>
          {u.prominent && <SafetyBox prominent />}
          <div className="est-box est-urgent">
            <Icon name="clock" size={20} />
            <div>
              <b>{u.line}</b>
              <span className="est-sublabel">{urgency.checksLabel}</span>
              <ul className="est-checks">
                {u.checks.map((c) => (
                  <li key={c}>
                    <Icon name="check" size={15} /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {!u.prominent && <SafetyBox />}
        </>
      )}

      {/* 5. Age, compare box */}
      {age && (
        <div className="est-box est-age">
          <Icon name="gauge" size={20} />
          <div>
            <p>{age.main}</p>
            {age.extra && <p className="est-extra">{age.extra}</p>}
          </div>
        </div>
      )}
      {showCompareBox(a) && (
        <div className="est-box est-compare">
          <Icon name="unitPlus" size={20} />
          <div>
            <b>{compareBox.title}</b>
            <p>{compareBox.text}</p>
            <button type="button" className="btn btn-ghost" onClick={onCompare}>
              <Icon name="gauge" size={18} /> {compareBox.button}
            </button>
          </div>
        </div>
      )}

      {/* 6. Book a visit */}
      <p className={`est-zip${zip === "out" ? " is-out" : ""}`}>
        <Icon name="pin" size={16} /> {zip === "out" ? zips.outsideNote : zips.inAreaNote}
      </p>
      <BookVisit a={a} />

      <button type="button" className="tool-back" onClick={onRestart}>
        {resultText.startOver}
      </button>
    </div>
  );
}

function SafetyBox({ prominent = false }: { prominent?: boolean }) {
  return (
    <div className={`est-box est-safety${prominent ? " is-prominent" : ""}`} role={prominent ? "alert" : undefined}>
      <Icon name="shield" size={20} />
      <div>
        <b>{safety.title}</b>
        <p>{safety.text}</p>
      </div>
    </div>
  );
}

function RepairBlock({ r }: { r: RepairResult }) {
  return (
    <section className="est-block">
      <span className="est-label">{repairText.heading}</span>
      {r.range ? <strong className="est-range">{rangeText(r.range)}</strong> : <strong className="est-msg">{r.message}</strong>}
      {r.messageSub && <p className="est-msg-sub">{r.messageSub}</p>}
      {r.likely.length > 0 && (
        <div className="est-causes">
          <span className="est-sublabel">{repairText.likelyLabel}</span>
          <ul>
            {r.likely.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}
      {r.lessCommon.length > 0 && (
        <p className="est-less">
          <b>{repairText.lessCommonLabel}:</b> {r.lessCommon.join(" · ")}
        </p>
      )}
      <p className="est-confirm">
        <Icon name="check" size={15} /> {r.confirm}
      </p>
      <p className="est-fine">{resultText.finePrint}</p>
    </section>
  );
}

function ReplaceBlock({ n }: { n: ReplacementResult }) {
  return (
    <section className="est-block">
      <span className="est-label">{replacementText.heading}</span>
      {n.range ? <strong className="est-range">{rangeText(n.range)}</strong> : <strong className="est-msg">{n.message}</strong>}
      {n.partialNote && <p className="est-less">{n.partialNote}</p>}
      <p className="est-fine">{resultText.finePrint}</p>
    </section>
  );
}

/* ─────────────────────────── Booking ─────────────────────────── */
// No contact fields here — the visitor books (and enters their details) in Housecall Pro.
function BookVisit({ a }: { a: Answers }) {
  return (
    <div className="est-book">
      <h3>{bookingText.title}</h3>
      <p className="form-hint">{bookingText.hint}</p>
      <BookingEmbed location="estimate-result" service={serviceLabel(a)} />
      <div className="est-book-acts">
        <CallLink className="btn btn-ghost btn-lg" location="estimate-result" />
      </div>
    </div>
  );
}
