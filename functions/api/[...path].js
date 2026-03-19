export async function onRequest(context) {
  const url = new URL(context.request.url);

  const backendUrl =
    "https://dreaminalgo-backend-production.up.railway.app" +
    url.pathname.replace("/api", "") +
    url.search;

  const response = await fetch(backendUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body:
      context.request.method !== "GET"
        ? context.request.body
        : undefined,
  });

  return response;
}