import type { JournalEntry } from "@/lib/types";

type JournalEntryCardProps = {
  entry: JournalEntry;
  onDelete: (id: string) => void;
};

export function JournalEntryCard({ entry, onDelete }: JournalEntryCardProps) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* mood emoji */}
          {entry.mood && (
            <span className="text-xl leading-none">{entry.mood}</span>
          )}

          {/* title */}
          {entry.title && (
            <h2 className="text-lg font-semibold text-slate-800">
              {entry.title}
            </h2>
          )}
        </div>

        {/* delete button */}
        <button
          onClick={() => onDelete(entry.id)}
          className="text-slate-400 hover:text-red-500"
          title="Delete entry"
        >
          ✕
        </button>
      </div>

      {/* body content */}
      <p className="mt-2 text-slate-700 whitespace-pre-wrap">{entry.content}</p>

      {/* footer date */}
      <div className="mt-3 text-xs text-slate-400">{entry.date}</div>
    </li>
  );
}