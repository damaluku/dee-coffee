// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findRecordByFilter, getMinifiedRecords, table } from "@/lib/airtable";
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
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        res.status(200).json(records);
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
