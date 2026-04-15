import { Mic, Square, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationState, formatTime } from "@/hooks/useConsultation";

interface Props {
  state: ConsultationState;
  elapsedSeconds: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function Waveform() {
  return (
    <div className="flex items-center gap-[3px] h-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-primary"
          animate={{ height: [4, 12 + Math.random() * 12, 4] }}
          transition={{
            duration: 0.6 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function RecordingControls({ state, elapsedSeconds, onStart, onStop, onReset }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {/* Primary action button */}
        {state === "ready" && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Mic className="h-4 w-4" />
            Start Recording
          </button>
        )}

        {state === "recording" && (
          <button
            onClick={onStop}
            className="flex items-center gap-2 rounded-lg bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90"
          >
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
        )}

        {state === "finalized" && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
          >
            <RotateCcw className="h-4 w-4" />
            New Consultation
          </button>
        )}

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <AnimatePresence mode="wait">
            {state === "recording" && (
              <motion.div
                key="live"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-destructive"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-destructive font-secondary uppercase tracking-wider">
                  Listening…
                </span>
                <span className="ml-1 text-sm font-bold text-foreground font-secondary tabular-nums">
                  {formatTime(elapsedSeconds)}
                </span>
              </motion.div>
            )}

            {state === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span className="text-xs font-semibold text-primary font-secondary uppercase tracking-wider">
                  Processing…
                </span>
              </motion.div>
            )}

            {state === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-medium text-muted-foreground font-secondary">
                  Ready
                </span>
              </motion.div>
            )}

            {state === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="text-xs font-semibold text-success font-secondary uppercase tracking-wider">
                  Review
                </span>
                <span className="ml-1 text-xs text-muted-foreground font-secondary">
                  {formatTime(elapsedSeconds)} recorded
                </span>
              </motion.div>
            )}

            {state === "finalized" && (
              <motion.div
                key="finalized"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-success" />
                <span className="text-xs font-semibold text-success font-secondary uppercase tracking-wider">
                  Saved
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Waveform visualization */}
      <AnimatePresence>
        {state === "recording" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg bg-primary/5 px-4 py-3"
          >
            <Waveform />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
