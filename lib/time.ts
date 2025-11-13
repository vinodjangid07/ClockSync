export type Suggestion = {
  iso: string;
  display: string;
  score: number;
};

export function formatInTimeZone(date: Date, timeZone: string): string {
  try {
    return date.toLocaleString("en-US", {
      timeZone,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return date.toISOString();
  }
}

export function getHourInTimeZone(date: Date, timeZone: string): number {
  try {
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    });
    const hourStr = f.format(date);
    const hour = parseInt(String(hourStr), 10);
    return Number.isNaN(hour) ? 0 : hour;
  } catch {
    return date.getUTCHours();
  }
}

export function isWorkingHour(hour: number): "good" | "ok" | "bad" {
  if (hour >= 8 && hour < 18) return "good"; // 8:00 - 17:59
  if ((hour >= 6 && hour < 8) || (hour >= 18 && hour < 22)) return "ok"; // early/late
  return "bad";
}

export function suggestAlternatives(
  date: Date,
  originTZ: string,
  targets: string[],
  take = 3
): Suggestion[] {
  const candidates: Suggestion[] = [];

  for (let delta = -8; delta <= 8; delta++) {
    const candidateDate = new Date(date.getTime() + delta * 60 * 60 * 1000);

    let score = 0;
    for (const tz of targets) {
      const h = getHourInTimeZone(candidateDate, tz);
      const status = isWorkingHour(h);
      if (status === "good") score += 1;
      else if (status === "ok") score += 0.5;
    }

    candidates.push({
      iso: candidateDate.toISOString(),
      display: formatInTimeZone(candidateDate, originTZ),
      score,
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, take);
}

export default {} as const;
