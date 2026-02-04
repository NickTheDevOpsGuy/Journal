// src/app/components/FilterBar.tsx
import type { ViewFilter } from "@/lib/types";

type Props = {
  value: ViewFilter;
  onChange: (v: ViewFilter) => void;
  counts: Record<ViewFilter, number>;
  options: ViewFilter[];
  getLabel?: (f: ViewFilter) => string;
};

export default function FilterBar({
  value,
  onChange,
  counts,
  options,
  getLabel,
}: Props) {
  const DEFAULT_LABEL: Record<ViewFilter, string> = {
    All: "All",
    Today: "Today",
    ThisWeek: "This Week",
    Older: "Older",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const label = getLabel ? getLabel(opt) : DEFAULT_LABEL[opt];
        const active = value === opt;

        return (
          <button
            key={opt}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt)}
            className={
              active
                ? "rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm ring-1 ring-indigo-500"
                : "rounded-full bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-300"
            }
          >
            <span>{label}</span>
            <span
              className={
                "ml-1 inline-block rounded-full px-1.5 text-xs " +
                (active ? "bg-white/20" : "bg-white/60 text-slate-700")
              }
            >
              {counts[opt]}
            </span>
          </button>
        );
      })}
    </div>
  );
}