const API_URL = "http://ip-api.com/json/?fields=currency";
const EXCHANGE_API = "https://api.exchangerate-api.com/v4/latest/USD";

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
    return { code: "USD", symbol: "$", rate: 1 };
  }
}

export function formatPrice(price: number, rate: number, symbol: string) {
  return `${symbol}${(price * rate).toFixed(2)}`;
}
