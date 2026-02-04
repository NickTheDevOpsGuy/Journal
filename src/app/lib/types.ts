// src/lib/types.ts

// Storage version — bump this if you change the entry shape in the future.
export const JOURNAL_STORAGE_KEY = "journal.v1";

export type JournalEntry = {
  id: string;           // uuid (preferred) or Date.now().toString()
  date: string;         // ISO string (e.g., new Date().toISOString())
  title?: string;
  content: string;
  mood?: "🙂" | "😐" | "🙁" | "🔥" | "✨";
};

// What the form/hook accepts when creating a new entry
export type NewEntry = Omit<JournalEntry, "id" | "date">;

// Optional: if you prefer a stricter filter type on the page
export type ViewFilter = "All" | "Today" | "ThisWeek" | "Older";