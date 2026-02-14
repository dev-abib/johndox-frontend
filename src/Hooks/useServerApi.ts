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
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${endpoint}`;

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    cache: "no-store", 
  };

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}



