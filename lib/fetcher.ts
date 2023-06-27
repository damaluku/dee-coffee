export const fetcher = (url: string) =>
  fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
