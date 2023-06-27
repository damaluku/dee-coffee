// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findRecordByFilter, getMinifiedRecords, table } from "@/lib/airtable";
import type { NextApiRequest, NextApiResponse } from "next";
import { CoffeeStoreTypes } from "..";

type Data = {
  message?: string;
  error?: any;
  records?: CoffeeStoreTypes;
  id?: string;
  calculatedVote?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    const { id } = req.body;

    if (id) {
      try {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          const record = records[0];

          let calculatedVote = parseInt(record.voting) + 1;

          // updaing record

          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculatedVote,
              },
            },
          ]);

          if (updateRecord) {
            const record = getMinifiedRecords(updateRecord);
            res.status(200).json(record);
          }
        } else {
          res.status(404).json({ message: "No records found", id });
        }
      } catch (error: any) {
        res.status(500).json({ message: "Error upvoting store", error });
      }
    } else {
      res.status(400).json({ message: "id is missing" });
    }
  }
}
