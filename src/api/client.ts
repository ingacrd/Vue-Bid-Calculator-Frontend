const API_URL = import.meta.env.VITE_API_URL as string;

export async function calculateBid(basePrice: number, vehicleType: string, signal?: AbortSignal) {

  const url = new URL('/api/bid/calculate', API_URL);

  url.searchParams.set('basePrice', basePrice.toString());
  url.searchParams.set('vehicleType', vehicleType);

  const resp = await fetch(url.toString(), { method: 'GET', signal });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`API ${resp.status}: ${text}`);
  }
  return resp.json();
}