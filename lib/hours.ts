import type { DayHours } from "@/types/content";

const DAY_ORDER: DayHours["day"][] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getDayHours(
  date: Date,
  hours: DayHours[],
): DayHours | undefined {
  const dayKey = DAY_ORDER[date.getDay()];
  return hours.find((entry) => entry.day === dayKey);
}

export const dayLabels: Record<DayHours["day"], string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

export function formatWindows(windows: DayHours["windows"]): string {
  if (windows.length === 0) return "Closed";
  return windows.map((slot) => `${slot.opens} – ${slot.closes}`).join(", ");
}

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; opensAt: string | null };

export function getOpenStatus(date: Date, hours: DayHours[]): OpenStatus {
  const today = getDayHours(date, hours);
  const minutesNow = date.getHours() * 60 + date.getMinutes();

  if (today) {
    for (const slot of today.windows) {
      const opensAt = toMinutes(slot.opens);
      const closesAt = toMinutes(slot.closes);
      if (minutesNow >= opensAt && minutesNow < closesAt) {
        return { isOpen: true, closesAt: slot.closes };
      }
    }

    const nextWindow = today.windows.find(
      (slot) => minutesNow < toMinutes(slot.opens),
    );
    if (nextWindow) {
      return { isOpen: false, opensAt: nextWindow.opens };
    }
  }

  return { isOpen: false, opensAt: null };
}
