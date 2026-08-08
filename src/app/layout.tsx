import type { Metadata } from "next";
import "./globals.css";
import { BookingFlowProvider } from "@/context/booking-flow-context";
import { Stepper } from "@/components/layout/stepper";

export const metadata: Metadata = {
  title: "Khimzey — Speak your language again",
  description:
    "Book live conversation lessons with fluent Tibetan speakers in Dharamshala, Kathmandu, and Bylakuppe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BookingFlowProvider>
          <Stepper />
          {children}
        </BookingFlowProvider>
      </body>
    </html>
  );
}
