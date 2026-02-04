// src/hooks/useJournal.ts
import { useEffect, useState } from "react";
import type { JournalEntry, NewEntry } from "@/lib/types";
import { JOURNAL_STORAGE_KEY } from "@/lib/types";

/** Prefer crypto.randomUUID when available, otherwise fallback. */
function genId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID() as string;
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Accepts array shape or { v:1, entries:[...] } shape. Returns null if nothing valid is found. */
function loadFromStorage(): JournalEntry[] | null {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // Plain array?
    if (Array.isArray(parsed)) return parsed as JournalEntry[];

    // Object shape?
    if (
      parsed &&
      typeof parsed === "object" &&
      "entries" in parsed &&
      Array.isArray((parsed as any).entries)
    ) {
      return (parsed as any).entries as JournalEntry[];
    }

    return null;
  } catch {
    return null;
  }
}

export function useJournal() {
  // 🔹 Lazy init: read from localStorage synchronously on first render
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const loaded = loadFromStorage();
    // console.log("[journal] loaded", loaded); // uncomment for a quick sanity check
    return loaded ?? [];
  });

  // 🔹 Autosave whenever entries change
  useEffect(() => {
    try {
      // Store as a plain array for simplicity
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("[useJournal] Failed to write localStorage:", e);
    }
  }, [entries]);

  // 🔹 Public API
  function addEntry(input: NewEntry) {
    const entry: JournalEntry = {
      id: genId(),
      date: new Date().toISOString(),
      ...input,
    };
    setEntries((prev) => [entry, ...prev]);
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  function clearAll() {
    setEntries([]);
    try {
      localStorage.removeItem(JOURNAL_STORAGE_KEY);
    } catch {}
  }

  return { entries, addEntry, removeEntry, clearAll };
}