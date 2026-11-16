import { createContext } from "react";

export type User = {
  title: "Mrs" | "Ms" | "Mx";
  surname: string;
  address: string;
  mpan: string;
  daysLeft: number; // days until the supply date
  switchDate: string; // DD/MM/YY, always in the future
  billDate: string; // DD/MM/YY, always after the switch date
  meterDate: string; // DD/MM/YY, meter reading deadline: after the switch, before the first bill
};

const pad = (n: number) => String(n).padStart(2, "0");
const fmt = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// daysLeft >= 1 and the first bill lands 20-45 days after the switch, so every date is in the future.
export function dates(daysLeft: number, billGap = 20 + Math.floor(Math.random() * 26)) {
  const sw = addDays(new Date(), daysLeft);
  // billGap >= 20, so the deadline (3 to billGap-3 days after the switch) is always before the bill
  const meterGap = 3 + Math.floor(Math.random() * (billGap - 5));
  return { daysLeft, switchDate: fmt(sw), billDate: fmt(addDays(sw, billGap)), meterDate: fmt(addDays(sw, meterGap)) };
}

// The user from the original Figma design – shown until a random one is generated.
export const DEFAULT_USER: User = {
  title: "Mrs",
  surname: "Featherstonehaugh",
  address: "Belvedere House, Basing View, Basingstoke RG21 4HG",
  mpan: "1200060599510",
  ...dates(14, 30),
};

export const UserContext = createContext<User>(DEFAULT_USER);

const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
const int = (n: number) => Math.floor(Math.random() * n);
const letters = (n: number) => Array.from({ length: n }, () => "ABCDEFGHJKLMNPRSTUWXY"[int(21)]).join("");

const SURNAMES = ["Okafor", "Patel", "Hargreaves", "Nowak", "McAllister", "Ahmed", "Whitcombe", "Jones", "Featherstonehaugh", "Li", "O'Sullivan", "Brennan", "Kowalczyk", "Ashworth", "Singh", "Thistlethwaite"];
const STREETS = ["Elm Grove", "Station Road", "Mill Lane", "Orchard Way", "Kings Avenue", "Church Street", "Meadow View", "The Crescent", "Victoria Terrace", "Hawthorn Close"];
const HOUSES = ["Rose Cottage", "Willow House", "Oakwood Lodge", "The Old Forge", "Brook Farm"];
const TOWNS = ["Basingstoke", "Leeds", "Cardiff", "Norwich", "Glasgow", "Bristol", "Exeter", "Sheffield", "Cambridge", "Belfast", "York", "Swansea"];

export function makeUser(): User {
  const place = Math.random() < 0.3 ? `${pick(HOUSES)}, ${pick(STREETS)}` : `${1 + int(120)} ${pick(STREETS)}`;
  const postcode = `${letters(Math.random() < 0.5 ? 1 : 2)}${1 + int(19)} ${1 + int(9)}${letters(2)}`;
  // MPANs are 13 digits, like the one in the design
  const mpan = String(1 + int(2)) + Array.from({ length: 12 }, () => int(10)).join("");
  return { title: pick(["Mrs", "Ms", "Mx"] as const), surname: pick(SURNAMES), address: `${place}, ${pick(TOWNS)} ${postcode}`, mpan, ...dates(1 + int(21)) };
}
