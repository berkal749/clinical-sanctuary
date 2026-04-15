import { useState, useCallback, useRef, useEffect } from "react";

export type ConsultationState = "ready" | "recording" | "processing" | "review" | "finalized";

export interface ConsultationStore {
  state: ConsultationState;
  elapsedSeconds: number;
  startRecording: () => void;
  stopRecording: () => void;
  confirmAndSave: () => void;
  reset: () => void;
}

export function useConsultation(): ConsultationStore {
  const [state, setState] = useState<ConsultationState>("ready");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer logic
  useEffect(() => {
    if (state === "recording") {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  const startRecording = useCallback(() => setState("recording"), []);

  const stopRecording = useCallback(() => {
    setState("processing");
    // Simulate AI processing
    setTimeout(() => setState("review"), 2400);
  }, []);

  const confirmAndSave = useCallback(() => setState("finalized"), []);
  const reset = useCallback(() => {
    setState("ready");
    setElapsedSeconds(0);
  }, []);

  return { state, elapsedSeconds, startRecording, stopRecording, confirmAndSave, reset };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
