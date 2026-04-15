import { TrendingUp } from "lucide-react";

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

export function PathologyCards() {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary flex items-center gap-1.5">
        <TrendingUp className="h-3.5 w-3.5" />
        Potential Pathologies
      </h3>
      <div className="space-y-2">
        {pathologies.map((p) => (
          <div key={p.name} className="rounded-lg bg-card p-3 shadow-clinical">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-foreground">
                {p.name}
              </span>
              <span className="text-xs font-bold text-primary font-secondary">
                {p.probability}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${p.color} transition-all`}
                style={{ width: `${p.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
