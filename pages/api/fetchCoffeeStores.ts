// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  stores: string | string[];
  message: string;
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { latlong, limit } = req.query;

    const stores = await fetchCoffeeStores(`${latlong}`, `${limit}`);

    res.status(200).json({
      stores,
      message: "Request successful",
      error: null,
    });
  } catch (error: any) {
    console.error(error);

    const errorCode = error?.status;

    res.status(errorCode).json({
      message: `somthing went wrong`,
      error,
      stores: [],
    });
  }
}
