// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMinifiedRecords, table } from "@/lib/airtable";
import type { NextApiRequest, NextApiResponse } from "next";
import { CoffeeStoreTypes } from "..";

type Data = {
  message?: string;
  error?: any;
  records?: CoffeeStoreTypes;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (id) {
    try {
      const findCoffeeStoreRecord = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();

      if (findCoffeeStoreRecord.length !== 0) {
        const records = getMinifiedRecords(findCoffeeStoreRecord);

        res.status(200).json(records.length ? records[0] : records);
      } else {
        res.status(404).json({ message: "No records found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  } else {
    res.status(400).json({ message: "id is missing" });
  }
}
