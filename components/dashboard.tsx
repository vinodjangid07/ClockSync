"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import { getTimeZones } from "@vvo/tzdb";
import { toast } from "react-toastify";
import {
  formatInTimeZone,
  getHourInTimeZone,
  isWorkingHour,
} from "../lib/time";

type TimezoneOption = {
  value: string;
  label: string;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#27272a',
    borderColor: '#3f3f46',
    color: '#f4f4f5',
    minHeight: '48px',
    borderRadius: '8px',
    paddingLeft: '8px',
    paddingRight: '8px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#52525b',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#18181b',
    border: '1px solid #3f3f46',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#27272a' : '#18181b',
    color: '#f4f4f5',
    '&:hover': {
      backgroundColor: '#27272a',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#f4f4f5',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#3f3f46',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#f4f4f5',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#a1a1aa',
    '&:hover': {
      backgroundColor: '#ef4444',
      color: '#ffffff',
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#71717a',
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#f4f4f5',
  }),
};

const PRESET_ZONES = [
  "Asia/Kolkata",
  "America/Los_Angeles",
  "Europe/London",
  "Australia/Sydney",
];

function ClockSyncApp() {
  const search = useSearchParams();
  const sharedTime = search?.get("time") ?? null;
  const sharedOrigin = search?.get("tz") ?? null;
  const sharedTargets = search?.get("targets")?.split(",") ?? PRESET_ZONES;

  const [originTZ, setOriginTZ] = useState<string>(() => 
    sharedOrigin || (typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC")
  );
  const [timeISO, setTimeISO] = useState<string | null>(sharedTime || null);
  const [targets, setTargets] = useState<string[]>(sharedTargets);
  const [visitorTZ, setVisitorTZ] = useState<string | null>(null);

  useEffect(() => {
    // This is intentional - we need to detect timezone after hydration to avoid SSR mismatch
    setVisitorTZ(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  const timezoneOptions: TimezoneOption[] = getTimeZones().map((tz) => ({
    value: tz.name,
    label: `${tz.name} (${tz.abbreviation || ""})`,
  }));



  const parsedDate = useMemo(() => {
    if (!timeISO) return null;
    try {
      return new Date(timeISO);
    } catch {
      return null;
    }
  }, [timeISO]);

  function handleGenerateLink() {
    if (!parsedDate) return;
    const params = new URLSearchParams();
    params.set("time", parsedDate.toISOString());
    params.set("tz", originTZ);
    params.set("targets", targets.join(","));
    const url = `${location.origin}${location.pathname}?${params.toString()}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => {
        // Fallback: show URL in a prompt for manual copying
        const copied = prompt("Copy this link:", url);
        if (copied) toast.success("Link copied!");
      });
  }

  const conversions = useMemo(() => {
    if (!parsedDate) return [];
    return targets.map((tz) => {
      const formatted = formatInTimeZone(parsedDate, tz);
      const hour = getHourInTimeZone(parsedDate, tz);
      const status = isWorkingHour(hour);
      return { tz, formatted, hour, status };
    });
  }, [parsedDate, targets]);

  const visitorView = useMemo(() => {
    if (!parsedDate || !visitorTZ) return null;
    const formatted = formatInTimeZone(parsedDate, visitorTZ);
    const hour = getHourInTimeZone(parsedDate, visitorTZ);
    return { tz: visitorTZ, formatted, hour, status: isWorkingHour(hour) };
  }, [parsedDate, visitorTZ]);



  return (
    <main className="rounded-2xl bg-zinc-900/40 border border-zinc-800 p-8 text-zinc-50">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-light text-white mb-2">ClockSync</h1>
        <p className="text-sm text-zinc-500">Sync Clocks · Schedule Easy</p>
      </header>

      <section className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-300">Origin timezone</label>
          <Select
            options={timezoneOptions}
            value={timezoneOptions.find((opt) => opt.value === originTZ)}
            onChange={(option: TimezoneOption | null) => setOriginTZ(option?.value || "UTC")}
            isSearchable
            placeholder="Select timezone..."
            styles={customSelectStyles}
            instanceId="origin-timezone-select"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-300">Meeting time (origin)</label>
          <input
            type="datetime-local"
            className="rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm text-white focus:border-zinc-600 focus:outline-none transition-colors"
            onChange={(e) => {
              const v = e.target.value;
              if (!v) return setTimeISO(null);
              const iso = new Date(v).toISOString();
              setTimeISO(iso);
            }}
            defaultValue={
              parsedDate ? parsedDate.toISOString().slice(0, 16) : undefined
            }
          />
        </div>
      </section>

      <section className="mb-8">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-zinc-300">Team timezones</label>
          <Select
            options={timezoneOptions}
            value={timezoneOptions.filter((opt) =>
              targets.includes(opt.value)
            )}
            onChange={(options: readonly TimezoneOption[]) =>
              setTargets(options ? options.map((opt) => opt.value) : [])
            }
            isMulti
            isSearchable
            placeholder="Add team timezones..."
            styles={customSelectStyles}
            instanceId="team-timezones-select"
          />
        </div>
      </section>



      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">Converted times</h2>
        </div>

        <div className="grid gap-3">
          {conversions.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              Enter a meeting time to see conversions.
            </div>
          )}
          {conversions.map((c) => (
            <div
              key={c.tz}
              className={`flex items-center justify-between rounded-xl px-4 py-4 border transition-colors ${
                c.status === "good"
                  ? "bg-zinc-800/50 border-zinc-700 text-emerald-400"
                  : c.status === "ok"
                  ? "bg-zinc-800/50 border-zinc-700 text-amber-400"
                  : "bg-zinc-900/50 border-zinc-800 text-rose-400"
              }`}
            >
              <div>
                <div className="font-medium text-white">{c.tz}</div>
                <div className="text-sm text-zinc-400 mt-1">{c.formatted}</div>
              </div>
              <div className="text-sm text-zinc-500">{c.hour}:00</div>
            </div>
          ))}

          {visitorView && (
            <div className="mt-4 rounded-xl border border-zinc-700 bg-zinc-800/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white">
                  Your local time ({visitorView.tz})
                </div>
                <div className="text-sm text-zinc-400">
                  {visitorView.formatted}
                </div>
              </div>
              <div className="text-sm text-zinc-500">
                Status:{" "}
                <span className={
                  visitorView.status === "good"
                    ? "text-emerald-400"
                    : visitorView.status === "ok"
                    ? "text-amber-400"
                    : "text-rose-400"
                }>
                  {visitorView.status === "good"
                    ? "Good"
                    : visitorView.status === "ok"
                    ? "Acceptable"
                    : "Outside working hours"}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pt-6 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGenerateLink}
            className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            Generate shareable link
          </button>
          <button
            onClick={() => {
              if (!parsedDate) return;
              navigator.clipboard
                .writeText(parsedDate.toISOString())
                .then(() => toast.success("ISO time copied!"));
            }}
            className="border border-zinc-700 text-white px-6 py-3 rounded-xl font-medium hover:border-zinc-600 transition-colors cursor-pointer"
          >
            Copy ISO
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-zinc-500">
            Minimal, shareable time conversions for remote teams.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function dashboard() {
  return (
    <Suspense fallback={<div className="text-center text-zinc-400">Loading...</div>}>
      <ClockSyncApp />
    </Suspense>
  );
}
