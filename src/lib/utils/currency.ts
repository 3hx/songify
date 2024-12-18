// 1000 lifetime requests, if product is successful remember to update this with different implementation
const API_URL = "https://ipinfo.io/json?token=ec78f100634186";
const EXCHANGE_API =
  "https://v6.exchangerate-api.com/v6/58b25aebd3660a429381f6f4/latest/USD";

import { COUNTRY_TO_CURRENCY } from "./countryToCurrency";

// Helper to check if we're in browser
const isBrowser = typeof window !== "undefined";

export async function getCurrencyDetails() {
  if (!isBrowser) {
    return { code: "USD", symbol: "$", rate: 1 };
  }

  try {
    // Get IP if not provided

    const response = await fetch(API_URL);

    const { country } = await response.json();
    const currencyCode = COUNTRY_TO_CURRENCY[country] || "USD";

    // Get exchange rates
    const ratesRes = await fetch(EXCHANGE_API);
    const { conversion_rates } = await ratesRes.json();

    const symbol = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
    }).format(0)[0];

    return {
      code: currencyCode,
      symbol,
      rate: conversion_rates[currencyCode] || 1,
    };
  } catch {
    console.error("Failed to fetch currency details");
    return { code: "USD", symbol: "$", rate: 1 };
  }
}

export function formatPrice(price: number, rate: number, symbol: string) {
  return `${symbol}${(price * rate).toFixed(2)}`;
}
