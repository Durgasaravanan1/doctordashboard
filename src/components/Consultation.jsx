

import React, { useEffect, useMemo, useState } from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiFileText,
  FiMic,
  FiPause,
  FiPlay,
  FiSquare,
  FiUser,
  FiClock,
  FiX,
} from "react-icons/fi";

const PAGE_BG = "#FEFCE8";

const PrimaryButton = ({ children, onClick, className = "", leftIcon, disabled, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      disabled ? "bg-[#00B8DB]/60 cursor-not-allowed" : "bg-[#00B8DB] hover:brightness-95 active:brightness-90",
      "text-black",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const SecondaryButton = ({ children, onClick, className = "", leftIcon, disabled, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={[
      "h-9 px-4 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
      disabled ? "bg-white/60 cursor-not-allowed" : "bg-white hover:brightness-95 active:brightness-90",
      "text-black",
      className,
    ].join(" ")}
  >
    {leftIcon}
    {children}
  </button>
);

const IconSquare = ({ children, bg = "bg-[#00B8DB]" }) => (
  <div className={`h-12 w-12 border-2 border-black rounded-md flex items-center justify-center ${bg}`}>
    <div className="text-black text-xl">{children}</div>
  </div>
);

const Tag = ({ children, bg = "bg-white" }) => (
  <span className={`inline-flex items-center h-6 px-2 border-2 border-black rounded-sm text-[11px] font-extrabold ${bg}`}>
    {children}
  </span>
);

const Card = ({ title, subtitle, rightSlot, children, borderColor = "border-[#00B8DB]" }) => (
  <div className={`border-2 ${borderColor} bg-white rounded-md overflow-hidden`}>
    <div className="p-4 border-b border-black/10 flex items-start justify-between gap-3">
      <div>
        <div className="font-extrabold text-sm uppercase text-black">{title}</div>
        {subtitle ? <div className="text-sm text-black/55 mt-1">{subtitle}</div> : null}
      </div>
      {rightSlot}
    </div>
    <div className="p-4">{children}</div>
  </div>
);

const MiniVital = ({ label, value }) => (
  <div className="border-2 border-[#00B8DB] bg-[#EAFBFF] rounded-sm p-3">
    <div className="text-[10px] font-extrabold text-black/60 uppercase">{label}</div>
    <div className="mt-1 text-sm font-extrabold text-black">{value || "—"}</div>
  </div>
);

const Modal = ({ open, title, children, onClose, widthClass = "max-w-[980px]" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/35 flex items-center justify-center p-4">
      <div className={`w-full ${widthClass} bg-white border-2 border-black rounded-md overflow-hidden`}>
        <div className="p-4 border-b border-black/10 flex items-center justify-between">
          <div className="font-extrabold text-sm uppercase text-black">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 border-2 border-black rounded-sm bg-white flex items-center justify-center"
            aria-label="Close"
          >
            <FiX className="text-black" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

function ProcessingStep({ label, done, active }) {
  return (
    <div
      className={[
        "h-12 flex items-center px-4 rounded-sm border-2 border-black",
        done ? "bg-[#00C950] text-black" : "bg-white text-black/50",
        active ? "animate-pulse" : "",
      ].join(" ")}
    >
      <span className="font-extrabold text-xs uppercase">{label}</span>
      {done ? <span className="ml-auto font-extrabold">✓</span> : null}
    </div>
  );
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Consultation() {
  // Draft from CaptureVitals
  const draft = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("consultationDraft") || "{}");
    } catch {
      return {};
    }
  }, []);

  const patientName = draft?.patientName || "—";
  const vitals = draft?.vitals || {};
  const capturedAt = draft?.capturedAt ? new Date(draft.capturedAt) : null;

  // Voice recording (SIMULATED timer)
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // AI pipeline
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [filled, setFilled] = useState(false);

  // UI bits
  const [isCopied, setIsCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const steps = useMemo(
    () => ["Audio Received", "Transcribing", "Extracting Data", "Generating Report"],
    []
  );

  // Timer tick
  useEffect(() => {
    let t;
    if (isRecording && !isPaused) {
      t = setInterval(() => setRecordingTime((s) => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [isRecording, isPaused]);

  // AI pipeline simulation
  useEffect(() => {
    if (!sent) return;

    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 900);
      return () => clearTimeout(t);
    }

    if (step === steps.length) {
      const t2 = setTimeout(() => setFilled(true), 600);
      return () => clearTimeout(t2);
    }
  }, [sent, step, steps.length]);

  const transcriptText = useMemo(() => {
    if (!filled) return "";
    return `Patient ${patientName} consultation audio transcribed successfully. 
Vitals recorded: Height ${vitals.height || "—"}, Weight ${vitals.weight || "—"}, BP ${vitals.bp || "—"}, Temp ${
      vitals.temp || "—"
    }, Pulse ${vitals.pulse || "—"}. 
Patient reports headache and fatigue (sample). No red flags reported. Plan discussed.`;
  }, [filled, patientName, vitals]);

  const report = useMemo(() => {
    if (!filled) return null;
    return {
      symptoms: "Persistent headache, fatigue (sample).",
      diagnosis: "Tension-type headache (sample).",
      medication: "Paracetamol 500mg SOS (sample).",
      notes: "Hydration, sleep hygiene, stress management advised.",
      followup: "Follow up in 2 weeks or earlier if symptoms worsen.",
    };
  }, [filled]);

  const canSendToAI = recordingTime > 0 && !sent;

  const handleStart = () => {
    // reset pipeline when starting new recording
    setSent(false);
    setStep(0);
    setFilled(false);

    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isRecording) return;
    setIsPaused((p) => !p);
  };

  const handleSendToAI = () => {
    if (!canSendToAI) return;
    setSent(true);
    setStep(0);
    setFilled(false);
  };

  const handleCopyTranscript = async () => {
    if (!filled) return;
    try {
      await navigator.clipboard.writeText(transcriptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  const handleSave = () => {
    if (!filled) return;
    alert("Medical report saved successfully!");
  };

  const handleExport = () => {
    if (!filled) return;
    alert("Medical report exported!");
  };

  const consultations = useMemo(
    () => [
      {
        id: 1,
        name: "John Smith",
        age: "45Y Male",
        type: "Follow-up",
        date: "1/28/2026",
        time: "10:30 AM",
        duration: "12:34",
        status: "COMPLETED",
        presentHistory:
          "Chronic lower back pain for 6 months. Stiffness in morning. Pain worsens with prolonged sitting.",
        pastHistory:
          "Hypertension (2018), Hyperlipidemia (2020). Appendectomy (2015). Allergy: Penicillin.",
        vitalSigns: "BP: 132/84, HR: 72, Temp: 98.6°F, SpO2: 98%",
        diagnosis: "Chronic mechanical lower back pain",
        treatment: "PT referral, ibuprofen PRN, core strengthening exercises.",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        age: "32Y Female",
        type: "Emergency",
        date: "1/28/2026",
        time: "11:15 AM",
        duration: "08:22",
        status: "COMPLETED",
        presentHistory:
          "Severe frontal headache with photophobia and nausea for 3 days. Sleep disturbance.",
        pastHistory:
          "No chronic conditions. Prior migraine episodes (2 in last year). Family history: migraines.",
        vitalSigns: "BP: 118/76, HR: 68, Temp: 98.2°F, SpO2: 99%",
        diagnosis: "Migraine without aura",
        treatment: "Sumatriptan PRN, hydration, dark room rest, follow-up if persistent.",
      },
    ],
    []
  );

  const openHistory = (c) => {
    setSelectedConsultation(c);
    setShowHistory(true);
  };

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        backgroundColor: PAGE_BG,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      <main className="mx-auto max-w-[1100px] px-6 py-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black tracking-tight">CONSULTATION</h1>
            <p className="text-sm text-black/55 mt-1">Voice record → AI processing → Report</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Tag bg="bg-white">
                <span className="inline-flex items-center gap-2">
                  <FiUser className="text-black/60" /> {patientName}
                </span>
              </Tag>
              <Tag bg="bg-[#EAFBFF]">BP: {vitals.bp || "—"}</Tag>
              {capturedAt ? (
                <Tag bg="bg-[#EAFBFF]">
                  <span className="inline-flex items-center gap-2">
                    <FiClock className="text-black/60" />{" "}
                    {capturedAt.toLocaleDateString()}{" "}
                    {capturedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </Tag>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SecondaryButton onClick={() => window.history.back()} leftIcon={<FiArrowLeft />}>
              BACK
            </SecondaryButton>
            <PrimaryButton onClick={() => setShowHistory(true)} leftIcon={<FiFileText />}>
              HISTORY
            </PrimaryButton>
          </div>
        </div>

        {/* Row 1: Voice + Processing + Transcript */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* VOICE RECORD */}
          <Card
            title="VOICE RECORD"
            subtitle="Record the consultation audio (simulated timer)"
            borderColor="border-black"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiMic />
              </IconSquare>
            }
          >
            <div className="flex items-center justify-between gap-3 border-2 border-black rounded-md bg-white p-4">
              <div>
                <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">DURATION</div>
                <div className="mt-1 text-3xl font-extrabold text-black font-mono">{formatTime(recordingTime)}</div>
              </div>

              <div className="flex items-center gap-2">
                {isRecording ? (
                  <Tag bg="bg-[#EAFBFF]">{isPaused ? "PAUSED" : "RECORDING"}</Tag>
                ) : (
                  <Tag bg="bg-white">READY</Tag>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStart}
                  className="h-10 border-2 border-black rounded-sm bg-[#00C950] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
                >
                  <FiPlay />
                  START
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStop}
                  className="h-10 border-2 border-black rounded-sm bg-[#FF2D2D] text-black font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2"
                >
                  <FiSquare />
                  STOP
                </button>
              )}

              <button
                type="button"
                onClick={handlePause}
                disabled={!isRecording}
                className={[
                  "h-10 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
                  isRecording ? "bg-white text-black hover:brightness-95 active:brightness-90" : "bg-white/60 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                <FiPause />
                {isPaused ? "RESUME" : "PAUSE"}
              </button>

              <button
                type="button"
                onClick={handleStop}
                disabled={!isRecording}
                className={[
                  "h-10 border-2 border-black rounded-sm font-extrabold text-xs uppercase inline-flex items-center justify-center gap-2",
                  isRecording ? "bg-[#F0B100] text-black hover:brightness-95 active:brightness-90" : "bg-[#F0B100]/60 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                <FiSquare />
                END
              </button>
            </div>

            <div className="mt-4 flex justify-end">
              <PrimaryButton
                onClick={handleSendToAI}
                leftIcon={<FiCheck />}
                disabled={!canSendToAI}
                className="min-w-[210px]"
              >
                {sent && !filled ? "PROCESSING..." : "SEND TO AI SYSTEM"}
              </PrimaryButton>
            </div>

            <div className="mt-3 text-sm text-black/55">
              Tip: record for a few seconds, then click <span className="font-extrabold">SEND TO AI SYSTEM</span>.
            </div>
          </Card>

          {/* AI PROCESSING */}
          <Card
            title="AI PROCESSING"
            subtitle="Pipeline progress"
            borderColor="border-[#F0B100]"
            rightSlot={
              <IconSquare bg="bg-[#F0B100]">
                <FiActivity />
              </IconSquare>
            }
          >
            <div className="space-y-3">
              {steps.map((s, i) => (
                <ProcessingStep
                  key={s}
                  label={s}
                  done={i < step}
                  active={sent && i === step && step < steps.length}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <SecondaryButton
                onClick={() => {
                  setSent(false);
                  setStep(0);
                  setFilled(false);
                }}
                disabled={!sent && !filled}
              >
                RESET AI
              </SecondaryButton>
            </div>
          </Card>

          {/* TRANSCRIPT */}
          <Card
            title="TRANSCRIPT"
            subtitle="Generated after processing"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiFileText />
              </IconSquare>
            }
          >
            <div className="border-2 border-black rounded-md bg-white p-3 h-60 overflow-y-auto text-sm text-black/75">
              {filled ? (
                <p className="leading-relaxed whitespace-pre-line">{transcriptText}</p>
              ) : (
                <div className="h-full flex items-center justify-center text-black/45 text-sm">
                  Transcript will appear after processing.
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <PrimaryButton
                onClick={handleCopyTranscript}
                leftIcon={<FiCopy />}
                disabled={!filled}
                className="min-w-[160px]"
              >
                {isCopied ? "COPIED" : "COPY"}
              </PrimaryButton>
            </div>
          </Card>
        </div>

        {/* Row 2: Vitals + Medical report */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* VITALS SNAPSHOT */}
          <Card
            title="VITALS SNAPSHOT"
            subtitle="From CaptureVitals"
            rightSlot={
              <IconSquare bg="bg-[#00B8DB]">
                <FiActivity />
              </IconSquare>
            }
          >
            <div className="grid grid-cols-1 gap-3">
              <MiniVital label="HEIGHT" value={vitals.height} />
              <MiniVital label="WEIGHT" value={vitals.weight} />
              <MiniVital label="BP" value={vitals.bp} />
              <MiniVital label="TEMP" value={vitals.temp} />
              <MiniVital label="PULSE" value={vitals.pulse} />
            </div>
          </Card>

          {/* MEDICAL REPORT */}
          <div className="lg:col-span-2">
            <Card
              title="MEDICAL REPORT"
              subtitle="Auto-filled after AI completes (mock)"
              rightSlot={
                <IconSquare bg="bg-[#00B8DB]">
                  <FiFileText />
                </IconSquare>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-black rounded-md bg-white p-3">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">PATIENT</div>
                  <div className="mt-1 text-sm font-extrabold text-black">{filled ? patientName : "—"}</div>
                </div>

                <div className="border-2 border-black rounded-md bg-white p-3">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">DIAGNOSIS</div>
                  <div className="mt-1 text-sm text-black">{filled ? report?.diagnosis : "—"}</div>
                </div>

                <div className="border-2 border-black rounded-md bg-white p-3">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">MEDICATION</div>
                  <div className="mt-1 text-sm text-black">{filled ? report?.medication : "—"}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-black rounded-md bg-white p-3">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">SYMPTOMS</div>
                  <div className="mt-1 text-sm text-black">{filled ? report?.symptoms : "—"}</div>
                </div>

                <div className="border-2 border-black rounded-md bg-white p-3">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">DOCTOR NOTES</div>
                  <div className="mt-1 text-sm text-black">{filled ? report?.notes : "—"}</div>
                </div>

                <div className="border-2 border-black rounded-md bg-white p-3 md:col-span-2">
                  <div className="text-[11px] font-extrabold tracking-widest text-black/60 uppercase">
                    FOLLOW-UP INSTRUCTIONS
                  </div>
                  <div className="mt-1 text-sm text-black">{filled ? report?.followup : "—"}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                <PrimaryButton onClick={handleSave} disabled={!filled}>
                  SAVE
                </PrimaryButton>
                <SecondaryButton onClick={handleExport} disabled={!filled}>
                  EXPORT
                </SecondaryButton>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent consultations */}
        <div className="mt-4">
          <Card title="RECENT CONSULTATIONS" subtitle="Click to view full history" borderColor="border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openHistory(c)}
                  className="text-left border-2 border-[#00B8DB] bg-white rounded-md p-4 hover:brightness-95 active:brightness-90"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-extrabold text-black">{c.name}</div>
                      <div className="text-sm text-black/60 mt-1">
                        {c.type} • {c.date} • {c.time}
                      </div>
                      <div className="text-xs text-black/45 mt-1">Duration: {c.duration}</div>
                    </div>
                    <div className="text-[11px] font-extrabold border-2 border-black rounded-sm px-2 py-1 bg-[#EAFBFF]">
                      {c.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* HISTORY MODAL */}
      <Modal
        open={showHistory}
        title="CONSULTATION HISTORY"
        onClose={() => {
          setShowHistory(false);
          setSelectedConsultation(null);
        }}
        widthClass="max-w-[980px]"
      >
        {selectedConsultation ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag bg="bg-white">{selectedConsultation.name}</Tag>
              <Tag bg="bg-[#EAFBFF]">{selectedConsultation.age}</Tag>
              <Tag bg="bg-[#EAFBFF]">{selectedConsultation.type}</Tag>
              <Tag bg="bg-[#EAFBFF]">
                {selectedConsultation.date} • {selectedConsultation.time}
              </Tag>
            </div>

            <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
              <div className="text-[11px] font-extrabold text-black/60 uppercase">Present History</div>
              <div className="mt-1 text-sm text-black">{selectedConsultation.presentHistory}</div>
            </div>

            <div className="border-2 border-[#F0B100] bg-white rounded-md p-4">
              <div className="text-[11px] font-extrabold text-black/60 uppercase">Past History</div>
              <div className="mt-1 text-sm text-black">{selectedConsultation.pastHistory}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-black bg-white rounded-md p-4">
                <div className="text-[11px] font-extrabold text-black/60 uppercase">Vital Signs</div>
                <div className="mt-1 text-sm text-black">{selectedConsultation.vitalSigns}</div>
              </div>
              <div className="border-2 border-black bg-white rounded-md p-4">
                <div className="text-[11px] font-extrabold text-black/60 uppercase">Diagnosis</div>
                <div className="mt-1 text-sm text-black">{selectedConsultation.diagnosis}</div>
              </div>
            </div>

            <div className="border-2 border-[#00B8DB] bg-white rounded-md p-4">
              <div className="text-[11px] font-extrabold text-black/60 uppercase">Treatment Plan</div>
              <div className="mt-1 text-sm text-black">{selectedConsultation.treatment}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-black/60">Select a consultation to view details.</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedConsultation(c)}
                  className="text-left border-2 border-[#00B8DB] bg-white rounded-md p-4 hover:brightness-95 active:brightness-90"
                >
                  <div className="font-extrabold text-black">{c.name}</div>
                  <div className="text-sm text-black/60 mt-1">
                    {c.type} • {c.date} • {c.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => {
              setShowHistory(false);
              setSelectedConsultation(null);
            }}
            className="h-9 px-4 border-2 border-black rounded-sm bg-white font-extrabold text-xs uppercase"
          >
            BACK
          </button>
        </div>
      </Modal>
    </div>
  );
}
