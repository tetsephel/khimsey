export type Phrase = { t: string; r: string; e: string };

export const HERO_PHRASES: Phrase[] = [
  { t: "བཀྲ་ཤིས་བདེ་ལེགས།", r: "tashi delek", e: "hello · good fortune to you" },
  { t: "ཁྱེད་རང་ག་འདྲ་འདུག", r: "khye-rang ga-dra duk?", e: "how are you?" },
  { t: "ང་བོད་པ་ཡིན།", r: "nga bö-pa yin", e: "I am Tibetan" },
  { t: "ཐུགས་རྗེ་ཆེ།", r: "thuk-je che", e: "thank you" },
  { t: "ཡག་པོ་འདུག", r: "yak-po duk", e: "it's good" },
];

export const PHRASEBOOK: Phrase[] = [
  { t: "བཀྲ་ཤིས་བདེ་ལེགས།", r: "tashi delek", e: "hello · greetings" },
  { t: "ཁྱེད་རང་ག་འདྲ་འདུག", r: "khye-rang ga-dra duk?", e: "how are you?" },
  { t: "ང་བོད་པ་ཡིན།", r: "nga bö-pa yin", e: "I am Tibetan" },
  { t: "ཡག་པོ་འདུག", r: "yak-po duk", e: "it's good / I like it" },
  { t: "ཐུགས་རྗེ་ཆེ།", r: "thuk-je che", e: "thank you" },
];

export const WORD_OF_DAY = {
  big: "ཇ་",
  title: "Tea",
  rom: "ja",
  body: "The first word offered in every Tibetan home. Learn to accept a cup properly and you've learned half of Tibetan hospitality — the rest is conversation. Book a lesson and use it tomorrow.",
};

export const DAYS = [
  { label: "Sun", sub: "Aug 9" },
  { label: "Mon", sub: "Aug 10" },
  { label: "Tue", sub: "Aug 11" },
  { label: "Wed", sub: "Aug 12" },
];

export const TIMES = [
  { label: "8:30 PM", sub: "6:00 AM for your tutor" },
  { label: "9:00 PM", sub: "6:30 AM for your tutor" },
  { label: "9:30 PM", sub: "7:00 AM for your tutor" },
  { label: "10:00 PM", sub: "7:30 AM for your tutor" },
];
