export function getApiURL() {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:1337";
}

export function getApiMedia(url: string | null | undefined) {
  if (url == null) return undefined;
  if (url == undefined) return undefined;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getApiURL()}${url}`;
}


