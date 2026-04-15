import { useState } from "react";
import { Mic, Square } from "lucide-react";
import { motion } from "framer-motion";

export function RecordingControls() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
          isRecording
            ? "bg-destructive text-destructive-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {isRecording ? (
          <>
            <Square className="h-3.5 w-3.5" />
            Stop
          </>
        ) : (
          <>
            <Mic className="h-3.5 w-3.5" />
            Record
          </>
        )}
      </button>

      {/* Live pulse */}
      <div className="flex items-center gap-2">
        {isRecording ? (
          <>
            <motion.div
              className="h-2.5 w-2.5 rounded-full bg-destructive"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold text-destructive font-secondary uppercase tracking-wider">
              Live
            </span>
          </>
        ) : (
          <>
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="text-xs font-medium text-muted-foreground font-secondary">
              Ready
            </span>
          </>
        )}
      </div>
    </div>
  );
}
