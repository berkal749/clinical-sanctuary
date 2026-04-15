import { Sparkles, MessageCircleQuestion } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationState } from "@/hooks/useConsultation";

const suggestedQuestions = [
  "Have you experienced any nausea or vomiting?",
  "Do you have any known drug allergies?",
  "Is there a family history of cardiac disease?",
  "Have you noticed any changes in weight recently?",
];

function SkeletonInsights() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-primary/5 p-2.5">
          <div
            className="h-3 rounded bg-muted animate-pulse"
            style={{ width: `${60 + Math.random() * 30}%`, animationDelay: `${i * 100}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

interface Props {
  state: ConsultationState;
}

export function AIInsights({ state }: Props) {
  const showQuestions = state === "review" || state === "finalized";

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        Suggested Questions
      </h3>

      <AnimatePresence mode="wait">
        {(state === "ready" || state === "recording") && (
          <motion.p
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-muted-foreground/60 py-4 text-center"
          >
            {state === "ready" ? "Awaiting recording…" : "Analyzing audio…"}
          </motion.p>
        )}

        {state === "processing" && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SkeletonInsights />
          </motion.div>
        )}

        {showQuestions && (
          <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1.5">
            {suggestedQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 rounded-lg bg-primary/5 p-2.5 cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <MessageCircleQuestion className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                <span className="text-xs leading-relaxed text-foreground">{q}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
