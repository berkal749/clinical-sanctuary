import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationState } from "@/hooks/useConsultation";

interface Pathology {
  name: string;
  probability: number;
  color: string;
}

const pathologies: Pathology[] = [
  { name: "Musculoskeletal Strain", probability: 72, color: "bg-success" },
  { name: "Herniated Disc (L4-L5)", probability: 45, color: "bg-warning" },
  { name: "Renal Calculi", probability: 18, color: "bg-muted-foreground/40" },
  { name: "Aortic Aneurysm", probability: 5, color: "bg-destructive/40" },
];

function SkeletonCards() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg bg-card p-3 shadow-clinical">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 w-28 rounded bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            <div className="h-3 w-8 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-1.5 rounded-full bg-secondary" />
        </div>
      ))}
    </div>
  );
}

interface Props {
  state: ConsultationState;
}

export function PathologyCards({ state }: Props) {
  const showCards = state === "review" || state === "finalized";

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5" />
        Potential Pathologies
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
            {state === "ready" ? "Awaiting data…" : "Collecting data…"}
          </motion.p>
        )}

        {state === "processing" && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SkeletonCards />
          </motion.div>
        )}

        {showCards && (
          <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
            {pathologies.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg bg-card p-3 shadow-clinical"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-foreground">{p.name}</span>
                  <span className="text-xs font-bold text-primary font-secondary">{p.probability}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary">
                  <motion.div
                    className={`h-full rounded-full ${p.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.probability}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
