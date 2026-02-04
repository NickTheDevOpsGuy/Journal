import type { JournalEntry } from "@/lib/types";
import { JournalEntryCard } from "./JournalEntryCard";

type JournalListProps = {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
};

export function JournalList({ entries, onDelete }: JournalListProps) {
  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
          No entries yet. Capture your first win above.
        </div>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
