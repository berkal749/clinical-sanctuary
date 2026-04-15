import { useState } from "react";
import { StickyNote } from "lucide-react";

export function StickyNotes() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Patient appears anxious, fidgeting with hands." },
    { id: 2, text: "Reports onset 3 days ago after heavy lifting." },
  ]);
  const [draft, setDraft] = useState("");

  const addNote = () => {
    if (!draft.trim()) return;
    setNotes((prev) => [...prev, { id: Date.now(), text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-secondary flex items-center gap-1.5">
        <StickyNote className="h-3.5 w-3.5" />
        Observations
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg bg-warning/10 p-2.5 text-xs leading-relaxed text-foreground"
          >
            {note.text}
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Add observation..."
          className="flex-1 rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>
  );
}
