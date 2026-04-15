import { CheckCircle2, AlertTriangle } from "lucide-react";

interface ChecklistItem {
  id: number;
  question: string;
  status: "answered" | "missing";
}

const items: ChecklistItem[] = [
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

export function ClinicalChecklist() {
  const answered = items.filter((i) => i.status === "answered").length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
          Clinical Checklist
        </h3>
        <span className="text-xs font-semibold text-muted-foreground font-secondary">
          {answered}/{items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-secondary mb-3">
        <div
          className="h-full rounded-full bg-success transition-all"
          style={{ width: `${(answered / items.length) * 100}%` }}
        />
      </div>

      <div className="space-y-1 overflow-y-auto flex-1">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-2.5 rounded-lg p-2.5 text-sm transition-colors ${
              item.status === "answered"
                ? "bg-success/5"
                : "bg-warning/5"
            }`}
          >
            {item.status === "answered" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
            )}
            <span
              className={`leading-snug ${
                item.status === "answered"
                  ? "text-muted-foreground"
                  : "text-foreground font-medium"
              }`}
            >
              {item.question}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
