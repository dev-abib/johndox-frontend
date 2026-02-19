interface FetchOptions {
  endpoint: string;
  mode?: "SSG" | "ISR" | "SSR";
  revalidate?: number;
}

export async function useServerApi<T = any>({
  endpoint,
  mode = "SSR",
  revalidate = 0,
}: FetchOptions): Promise<T> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, ""); 

  const url = `${baseUrl}${endpoint}`;

  console.log("[useServerApi] Fetching:", url);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint} — status: ${res.status}`);
  }

  return res.json();
}


