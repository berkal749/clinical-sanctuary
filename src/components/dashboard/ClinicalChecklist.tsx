import { CheckCircle2, AlertTriangle, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationState } from "@/hooks/useConsultation";

interface ChecklistItem {
  id: number;
  question: string;
  status: "answered" | "missing";
}

const reviewItems: ChecklistItem[] = [
  { id: 1, question: "Chief complaint and onset timeline", status: "answered" },
  { id: 2, question: "Pain location, severity (1-10), and character", status: "answered" },
  { id: 3, question: "Aggravating and relieving factors", status: "answered" },
  { id: 4, question: "Associated symptoms (nausea, fever, SOB)", status: "missing" },
  { id: 5, question: "Past medical & surgical history", status: "answered" },
  { id: 6, question: "Current medications and allergies", status: "missing" },
  { id: 7, question: "Family history of relevant conditions", status: "missing" },
  { id: 8, question: "Social history (smoking, alcohol, occupation)", status: "answered" },
  { id: 9, question: "Review of systems — cardiovascular", status: "missing" },
  { id: 10, question: "Review of systems — respiratory", status: "answered" },
];

function SkeletonRows() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2.5 rounded-lg bg-secondary/50 p-2.5">
          <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
          <div
            className="h-3 rounded bg-muted animate-pulse"
            style={{ width: `${50 + Math.random() * 40}%`, animationDelay: `${i * 120}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <ClipboardList className="h-10 w-10 text-muted-foreground/30 mb-3" />
      <p className="text-sm font-medium text-muted-foreground">No checklist yet</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Start recording to generate the clinical checklist</p>
    </div>
  );
}

interface Props {
  state: ConsultationState;
  onConfirm: () => void;
}

export function ClinicalChecklist({ state, onConfirm }: Props) {
  const showItems = state === "review" || state === "finalized";
  const items = showItems ? reviewItems : [];
  const answered = items.filter((i) => i.status === "answered").length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
          Clinical Checklist
        </h3>
        {showItems && (
          <span className="text-xs font-semibold text-muted-foreground font-secondary">
            {answered}/{items.length}
          </span>
        )}
      </div>

      {showItems && (
        <>
          <div className="h-1.5 rounded-full bg-secondary mb-3">
            <motion.div
              className="h-full rounded-full bg-success"
              initial={{ width: 0 }}
              animate={{ width: `${(answered / items.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </>
      )}

      <div className="space-y-1 overflow-y-auto flex-1">
        <AnimatePresence mode="wait">
          {state === "ready" && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState />
            </motion.div>
          )}

          {(state === "recording" || state === "processing") && (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {state === "recording" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ClipboardList className="h-10 w-10 text-primary/30 mb-3" />
                  <p className="text-sm font-medium text-muted-foreground">Listening…</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Checklist will populate after recording</p>
                </div>
              ) : (
                <SkeletonRows />
              )}
            </motion.div>
          )}

          {showItems && (
            <motion.div key="items" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-start gap-2.5 rounded-lg p-2.5 text-sm transition-colors mb-1 ${
                    item.status === "answered" ? "bg-success/5" : "bg-warning/5"
                  }`}
                >
                  {item.status === "answered" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
                  )}
                  <span
                    className={`leading-snug ${
                      item.status === "answered" ? "text-muted-foreground" : "text-foreground font-medium"
                    }`}
                  >
                    {item.question}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirm & Save */}
      <AnimatePresence>
        {state === "review" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="pt-3 border-t mt-3"
          >
            <button
              onClick={onConfirm}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Confirm & Save
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
