import { Check } from "lucide-react";
import { ConsultationState } from "@/hooks/useConsultation";

type StepStatus = "complete" | "active" | "pending";

const statusStyles: Record<StepStatus, string> = {
  complete: "bg-success text-success-foreground",
  active: "bg-primary text-primary-foreground ring-4 ring-primary/20",
  pending: "bg-muted text-muted-foreground",
};

function getSteps(state: ConsultationState) {
  const stateToStep: Record<ConsultationState, number> = {
    ready: 0,
    recording: 1,
    processing: 1,
    review: 2,
    finalized: 3,
  };
  const active = stateToStep[state];

  return [
    { id: 1, label: "Intake" },
    { id: 2, label: "Interrogative" },
    { id: 3, label: "Exam" },
    { id: 4, label: "Synthesis" },
  ].map((s, i) => ({
    ...s,
    status: (i < active ? "complete" : i === active ? "active" : "pending") as StepStatus,
  }));
}

interface Props {
  state: ConsultationState;
}

export function WorkflowTimeline({ state }: Props) {
  const steps = getSteps(state);

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary mb-3">
        Workflow
      </h3>
      <div className="relative pl-4">
        <div className="absolute left-[1.0625rem] top-3 bottom-3 w-px bg-border" />
        {steps.map((step) => (
          <div key={step.id} className="relative flex items-center gap-3 py-2.5">
            <div
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${statusStyles[step.status]}`}
            >
              {step.status === "complete" ? <Check className="h-3.5 w-3.5" /> : step.id}
            </div>
            <span
              className={`text-sm font-medium ${
                step.status === "active"
                  ? "text-foreground"
                  : step.status === "complete"
                  ? "text-muted-foreground"
                  : "text-muted-foreground/60"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
