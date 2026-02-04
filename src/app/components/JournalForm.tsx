import { useState } from "react";
import type { JournalEntry } from "@/lib/types";
import type { NewEntry } from "@/lib/types";

type JournalFormProps = {
  onSubmit: (partial: NewEntry) => void;
  className?: string;
};

export function JournalForm({ onSubmit, className }: JournalFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<JournalEntry["mood"]>();

  const moods: NonNullable<JournalEntry["mood"]>[] = ["🙂","😐","🙁","🔥","✨"];
  

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t && !c) return;
    onSubmit({ title: t || undefined, content: c, mood });
    setTitle("");
    setContent("");
  }

  const field =
    "w-full rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <form onSubmit={submit} className={className ?? "space-y-3"}>
      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700"
        >
          Title (optional)
        </label>
        <input
          id="title"
          className={field}
          placeholder="e.g., A tiny win today"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-700"
        >
          What’s on your mind?
        </label>
        <textarea
          id="content"
          className={field + " min-h-28"}
          placeholder="Free-write a few sentences…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-700"
        >
          How do you feel?
        </label>
        {moods.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setMood(emoji)}
            className={mood === emoji ? "selected" : "unselected"}
            type="button"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={!title.trim() && !content.trim()}
          className="
            inline-flex items-center justify-center rounded-xl
            bg-indigo-600 px-4 py-2 text-sm font-medium text-white
            hover:bg-indigo-700 active:bg-indigo-800
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            disabled:opacity-50
          "
        >
          Add entry
        </button>
      </div>
    </form>
  );
}
