const API_URL = import.meta.env.VITE_API_URL as string;

export async function calculateBid(basePrice: number, vehicleType: string) {

  const url = new URL('/api/bid/calculate', API_URL);
  console.log("the url is:" + url);
  url.searchParams.set('basePrice', basePrice.toString());
  url.searchParams.set('vehicleType', vehicleType);
  
  console.log("the url with params:" + url);
  const resp = await fetch(url.toString(), { method: 'GET' });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`API ${resp.status}: ${text}`);
  }
  return resp.json();
}