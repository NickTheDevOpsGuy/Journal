// lib/date.ts

export function isToday(date: Date, now: Date = new Date()): boolean {
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function isThisWeek(date: Date, now: Date = new Date()): boolean {
  // normalize both dates to midnight
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // how many days back to sunday?
  const daysToSubtract = (today.getDay() + 6) % 7; // 0=Sun, 1=Mon...
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysToSubtract);

  // end is +7 days
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return target >= startOfWeek && target < endOfWeek;
}

export function isOlder(date: Date, now: Date = new Date()): boolean {
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // use same Monday-start offset as isThisWeek
  const daysToSubtract = (today.getDay() + 6) % 7;
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysToSubtract);

  return target < startOfWeek;
}

export function formatSince(at: Date, now: Date = new Date()): string {
  const ms = now.getTime() - at.getTime();
  if (ms < 45_000) return "just now";
  const m = Math.round(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(ms / 3_600_000);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(ms / 86_400_000);
  return `${d}d ago`;
}

export function formatDateOrTime(date: Date) {
  if (isToday(date)) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (isThisWeek(date)) {
    return date.toLocaleDateString([], { weekday: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}
