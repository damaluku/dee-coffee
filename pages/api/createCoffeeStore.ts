// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  table: any;
  message: string;
};

const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("coffee-stores");

console.log(table);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    res.status(200).json({
      table,
      message: "correct request method",
    });
  } else
    res.status(500).json({
      table: null,
      message: "Not correct request method",
    });
}
