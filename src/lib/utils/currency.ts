// 1000 lifetime requests, if product is successful remember to update this with different implementation
const API_URL =
  "https://geo.ipify.org/api/v2/country?apiKey=at_Y6RHZ6YJmOY3hJi3PhdHRFqMUMKUs";
const EXCHANGE_API =
  "https://v6.exchangerate-api.com/v6/58b25aebd3660a429381f6f4/latest/USD";

export async function getCurrencyDetails() {
  try {
    // Get local currency code
    const response = await fetch(API_URL);
    const { currency } = await response.json();

    // Get exchange rates
    const ratesRes = await fetch(EXCHANGE_API);
    const { rates } = await ratesRes.json();

    // Get symbol
    const symbol = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency,
    }).format(0)[0];

    return {
      code: currency,
      symbol,
      rate: rates[currency] || 1,
    };
  } catch {
    console.error("Failed to fetch currency details");
    return { code: "USD", symbol: "$", rate: 1 };
  }
}

export function formatPrice(price: number, rate: number, symbol: string) {
  return `${symbol}${(price * rate).toFixed(2)}`;
}
