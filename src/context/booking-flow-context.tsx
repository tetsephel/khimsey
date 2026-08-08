"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Tutor } from "@/types/tutor";

type Day = { label: string; sub: string };
type Time = { label: string; sub: string };

type BookingFlowState = {
  language: string | null;
  level: string | null;
  tutor: Tutor | null;
  day: Day | null;
  time: Time | null;
  setLanguage: (v: string) => void;
  setLevel: (v: string) => void;
  setTutor: (v: Tutor) => void;
  setDay: (v: Day) => void;
  setTime: (v: Time) => void;
  reset: () => void;
};

const BookingFlowContext = createContext<BookingFlowState | null>(null);

export function BookingFlowProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [day, setDay] = useState<Day | null>(null);
  const [time, setTime] = useState<Time | null>(null);

  const reset = () => {
    setLanguage(null);
    setLevel(null);
    setTutor(null);
    setDay(null);
    setTime(null);
  };

  return (
    <BookingFlowContext.Provider
      value={{
        language,
        level,
        tutor,
        day,
        time,
        setLanguage,
        setLevel,
        setTutor,
        setDay,
        setTime,
        reset,
      }}
    >
      {children}
    </BookingFlowContext.Provider>
  );
}

export function useBookingFlow() {
  const ctx = useContext(BookingFlowContext);
  if (!ctx) {
    throw new Error("useBookingFlow must be used within BookingFlowProvider");
  }
  return ctx;
}
