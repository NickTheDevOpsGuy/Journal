// src/app/pages/JournalPage.tsx
// If your file lives elsewhere, keep the relative imports the same as before.

import { useMemo, useState } from "react";
import { useJournal } from "@/hooks/useJournal";
import { JournalForm } from "@/components/JournalForm";
import { JournalList } from "@/components/JournalList";
import FilterBar from "@/components/FilterBar";
import { isOlder, isThisWeek, isToday } from "@/lib/date";
import type { JournalEntry, ViewFilter } from "@/lib/types";

// ────────────────────────────────────────────────────────────────
// IMPORTANT: Ensure ViewFilter in src/lib/types.ts is:
// export type ViewFilter = "All" | "Today" | "ThisWeek" | "Older";
// (We render "This Week" via labels below.)
// ────────────────────────────────────────────────────────────────

const FILTERS: ViewFilter[] = ["All", "Today", "ThisWeek", "Older"];
const LABEL: Record<ViewFilter, string> = {
  All: "All",
  Today: "Today",
  ThisWeek: "This Week",
  Older: "Older",
};

export default function JournalPage() {
  const { entries, addEntry, removeEntry } = useJournal();

  // Active filter
  const [filter, setFilter] = useState<ViewFilter>("All");

  // Build time buckets + counts when entries change.
  const { buckets, counts } = useMemo(() => {
    const b: Record<Exclude<ViewFilter, "All">, JournalEntry[]> = {
      Today: [],
      ThisWeek: [],
      Older: [],
    };

    for (const e of entries) {
      const d = new Date(e.date); // e.date is ISO → Date
      if (isToday(d)) b.Today.push(e);
      else if (isThisWeek(d)) b.ThisWeek.push(e);
      else if (isOlder(d)) b.Older.push(e);
    }

    const counts: Record<ViewFilter, number> = {
      All: entries.length,
      Today: b.Today.length,
      ThisWeek: b.ThisWeek.length,
      Older: b.Older.length,
    };

    return { buckets: b, counts };
  }, [entries]);

  // Select which entries to display based on filter.
  const filteredEntries = useMemo(() => {
    switch (filter) {
      case "All":
        return entries;
      case "Today":
        return buckets.Today;
      case "ThisWeek":
        return buckets.ThisWeek; // already excludes Today via bucketing
      case "Older":
        return buckets.Older;
    }
  }, [entries, buckets, filter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-screen-sm p-6 sm:p-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Journal</h1>
          <p className="text-sm text-slate-600">
            Capture a thought, feeling, or win.
          </p>
        </header>

        {/* Create new entry */}
        <section>
          <JournalForm
            onSubmit={addEntry}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4 sm:p-6 space-y-3"
          />
        </section>

        {/* Filters + List */}
        <section className="space-y-4">
          <FilterBar
            value={filter}
            onChange={setFilter}
            options={FILTERS}
            getLabel={(f: ViewFilter) => LABEL[f]}
            counts={counts}
          />

          <JournalList entries={filteredEntries} onDelete={removeEntry} />
        </section>
      </div>
    </div>
  );
}