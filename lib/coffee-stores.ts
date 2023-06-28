import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

const getCoffeeStoresPhotos = async () => {
  try {
    const photos = await unsplash?.search?.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 5,
      orientation: "portrait",
    });

    const unsplashResults: any = photos.response?.results || [];

    return unsplashResults.map((result: any) => result.urls["regular"]);
  } catch (error) {
    console.error("Error originating from unsplash", error);
  }
};

export const getUrlForStores = (
  query: string,
  latLong: string,
  limit: string | number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latlong: string = "9.053844%2C7.468849",
  limit: string | number = 4
) => {
  const photos = await getCoffeeStoresPhotos();
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
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  try {
    const response = await fetch(
      getUrlForStores("coffee", latlong, limit),
      options
    );

    const data = await response.json();

    return data?.results.map((result: any, index: number) => {
      return {
        fsq_id: result.fsq_id,
        name: result.name,
        address: result?.location.address ? result?.location.address : null,
        neighbourhood: result?.neighbourhood ? result?.neighbourhood : null,
        cross_street: result?.location.cross_street
          ? result?.location.cross_street
          : null,
        locality: result?.location.locality ? result?.location.locality : null,
        formatted_address: result?.location.formatted_address
          ? result?.location.formatted_address
          : null,
        distance: result.distance,

        voting: 0,
        imgUrl: photos.length > 0 ? photos[index] : null,
      };
    });
  } catch (error: any) {
    console.log(error?.message ? error?.message : error);
  }
};

/*  fsq_id: string;
        name: string;
       address: string;
       neighbourhood: string; 
        voting: number,
       imgUrl: string | null;
        cross_street: string;
        locality: string;
         formatted_address: string;
         distance: number; */

/*  imgUrl: string | null;
  fsq_id: string;
  categories: Categories;
  chains: [];
  distance: number;
  link: string;
  location: {
    address: string;
    country: string;
    cross_street: string;
    formatted_address: string;
    locality: string;
    region: string;
  };
  related_places: any;
  timezone: string;
  id: number;
  name: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string; */
