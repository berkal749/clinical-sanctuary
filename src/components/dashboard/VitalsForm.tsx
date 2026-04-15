import { useState } from "react";
import { Heart, Thermometer, Activity, Droplets } from "lucide-react";

interface Vital {
  key: string;
  label: string;
  unit: string;
  icon: React.ElementType;
  placeholder: string;
}

const vitals: Vital[] = [
  { key: "hr", label: "HR", unit: "bpm", icon: Heart, placeholder: "72" },
  { key: "bp", label: "BP", unit: "mmHg", icon: Activity, placeholder: "120/80" },
  { key: "temp", label: "Temp", unit: "°F", icon: Thermometer, placeholder: "98.6" },
  { key: "spo2", label: "SpO₂", unit: "%", icon: Droplets, placeholder: "98" },
];

export function VitalsForm() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <div className="grid grid-cols-2 gap-2">
      {vitals.map((v) => (
        <div
          key={v.key}
          className="flex items-center gap-2 rounded-lg bg-secondary p-2.5"
        >
          <v.icon className="h-4 w-4 shrink-0 text-primary" />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground font-secondary">
              {v.label}
            </label>
            <input
              type="text"
              value={values[v.key] || ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
              }
              placeholder={v.placeholder}
              className="block w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-secondary">
            {v.unit}
          </span>
        </div>
      ))}
    </div>
  );
}
