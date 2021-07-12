export const fetcher = (resource: string, init?: any) =>
  fetch(resource, init).then((res) => res.json())
