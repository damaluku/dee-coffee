import { CoffeeStoreTypes } from "@/pages";

export const isEmpty = (obj: CoffeeStoreTypes) => {
  return Object.keys(obj).length === 0;
};
