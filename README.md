# Khimzey · ཁྱིམ་གཟེ།

**A language survives out loud.** Khimzey is a marketplace where members of the Tibetan diaspora learn to *speak* their family's language through live, one-on-one conversation with fluent speakers in India, Nepal, and Bhutan.

Built for the **GTPN Hackathon 2026**.

**Live demo:** https://khimzey.vercel.app

---

## The problem

A language doesn't die when it stops being written. It dies when it stops being spoken. Across the Tibetan diaspora, a whole generation understands the language at the dinner table but answers in English — they can follow every word, but the speaking never came. Meanwhile, fluent Tibetan speakers in the settlements of India, Nepal, and Bhutan have exactly the skill those learners need.

Existing language apps are built for beginners and lean on flashcards and grammar drills — neither of which fits a heritage speaker, and neither of which is how a language actually comes back.

## What Khimzey does

Khimzey connects the two sides directly:

- **For learners** — affordable, conversation-first lessons with a real fluent speaker who meets them at their level, including the level nobody else builds for: *"I understand, but I can't speak."*
- **For tutors** — fluent speakers set their own hours, teach from home, and get paid for their time, with earnings going directly to them.

Every lesson passes the language on, one voice to another — and supports Tibetan communities in exile in the process.

## Features

- **Landing page** — the mission, how it works, and a word of the day, in a woodblock-and-prayer-flag visual style with Tibetan script throughout.
- **Guided booking flow** — a five-step stepper: choose language → choose level (including the heritage-speaker track) → pick a tutor → book a day/time → take the lesson.
- **Tutor search** — browse tutors and filter by dialect (Ü-Tsang, Amdo, Kham, and more) and location, with live search by name, dialect, city, or language.
- **Live video lesson** — a real, working video call (via Jitsi) with a phrasebook alongside the call and a live lesson timer.
- **Lesson recap** — a shared record of the phrases covered and notes for next time, visible to both learner and tutor.
- **Tutor rating** — learners rate their tutor and leave a short review after each lesson.
- **Priority rebooking** — hold a recurring weekly slot with a favorite tutor.
- **Apply to teach** — a tutor-facing application page where fluent speakers list the dialects they teach and their comfort level for each.

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **CSS** (custom design system, no UI framework)
- **Jitsi Meet** for live video
- **Vercel** for hosting and continuous deployment
- **localStorage** for lightweight client-side persistence (ratings, recaps, applications)

## Project structure

```
src/
├─ app/
│  ├─ page.tsx            # landing page
│  ├─ start/              # step 1 — choose language
│  ├─ level/              # step 2 — choose level
│  ├─ teachers/           # step 3 — tutor search + filter
│  ├─ booking/            # step 4 — pick day/time
│  ├─ lesson/             # step 5 — live video lesson
│  ├─ lesson/complete/    # lesson recap, rating, priority
│  ├─ teach/              # tutor application page
│  └─ globals.css         # design system + all styles
├─ components/
│  ├─ landing/            # hero, how-it-works, teach strip, footer
│  ├─ flow/               # tutor card, intro modal, avatar
│  └─ layout/             # stepper
├─ context/               # booking-flow state (shared across steps)
├─ data/                  # tutors + phrasebook (mock data)
└─ types/                 # shared TypeScript types
```

## Scope & honesty note

This is a hackathon MVP focused on the end-to-end **experience**. Tutor profiles and bookings are simulated with mock data, and there is no backend, authentication, or payment processing yet — persistence is handled client-side via `localStorage`. **The video lesson, however, is real.**

## Team

Built by team **Khimzey** for the GTPN Hackathon 2026.

- **Tsewang Lhamo**
- **Tenzing Tsephel**
- **Justin Corke**

---

*Khimzey keeps Tibetan spoken — one conversation at a time.*
