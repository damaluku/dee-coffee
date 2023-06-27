import { CoffeeStoreTypes } from "@/pages";

export const isEmpty = (obj: CoffeeStoreTypes) => {
  return obj && Object.keys(obj).length === 0;
};

// export const isEmpty = (obj: CoffeeStoreTypes) => {
//   return obj && Object.keys(obj).length === 0;
// };

// export const fetcher = (url: RequestInfo | URL) =>
//   fetch(url).then((res) => res.json());
