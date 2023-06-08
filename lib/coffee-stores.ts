import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

const getCoffeeStoresPhoton = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 9,
    orientation: "portrait",
  });

  const unsplashResults: any = photos.response?.results;

  return unsplashResults.map((result: any) => result.urls["regular"]);
};

export const getUrlForStores = (
  query: string,
  latLong: string,
  limit: string | number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoresPhoton();
  interface Options {
    method: string;
    headers: {
      accept: string;
      Authorization: any;
    };
  }

  const options: Options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };
  //https:api.foursquare.com/v3/places/search?query=coffee&ll=9.053844%2C7.468849&limit=21

  try {
    const response = await fetch(
      getUrlForStores("coffee", "9.053844%2C7.468849", 9),
      options
    );

    const data = await response.json();

    return data?.results.map((result: any, index: number) => {
      return {
        ...result,
        imgUrl: photos.length > 0 ? photos[index] : null,
      };
    });
  } catch (error: any) {
    console.log(error?.message ? error?.message : error);
  }
};
