export type JournalEntry = {
  id: string; // uuid or Date.now().toString()
  date: string; // ISO string
  title?: string;
  content: string;
  mood?: "🙂" | "😐" | "🙁" | "🔥" | "✨";
};

export const JOURNAL_STORAGE_KEY = "journal:entries:v1";

export const VIEW_FILTER_OPTIONS = [
  "All",
  "Today",
  "This Week",
  "Older",
] as const;
export type ViewFilter = (typeof VIEW_FILTER_OPTIONS)[number];