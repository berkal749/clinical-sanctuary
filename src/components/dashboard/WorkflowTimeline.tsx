import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Intake", status: "complete" as const },
  { id: 2, label: "Interrogative", status: "active" as const },
  { id: 3, label: "Exam", status: "pending" as const },
  { id: 4, label: "Synthesis", status: "pending" as const },
];

type StepStatus = "complete" | "active" | "pending";

const statusStyles: Record<StepStatus, string> = {
  complete: "bg-success text-success-foreground",
  active: "bg-primary text-primary-foreground ring-4 ring-primary/20",
  pending: "bg-muted text-muted-foreground",
};

export function WorkflowTimeline() {
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary mb-3">
        Workflow
      </h3>
      <div className="relative pl-4">
        {/* Vertical line */}
        <div className="absolute left-[1.0625rem] top-3 bottom-3 w-px bg-border" />
        
        {steps.map((step) => (
          <div key={step.id} className="relative flex items-center gap-3 py-2.5">
            <div
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${statusStyles[step.status]}`}
            >
              {step.status === "complete" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                step.id
              )}
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
