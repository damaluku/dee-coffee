// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findRecordByFilter, getMinifiedRecords, table } from "@/lib/airtable";
import type { NextApiRequest, NextApiResponse } from "next";

/* type Data = {
  table: any;
  message: string;
}; */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const {
      id,
      name,
      address,
      neighbourhood,
      voting,
      imgUrl,
      cross_street,
      locality,
      formatted_address,
      distance,
    } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);

        if (records.length !== 0) {
          res.status(200).json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address: address ? address : "",
                  neighbourhood: neighbourhood ? neighbourhood : "",
                  voting: voting ? voting : 0,
                  imgUrl,
                  cross_street: cross_street ? cross_street : "",
                  locality: locality ? locality : "",
                  formatted_address: formatted_address ? formatted_address : "",
                  distance: distance ? distance : 0,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);

            res.json(records);
          } else {
            res.status(400).json({ message: "id or name is missing!" });
          }
        }
      } else {
        res.status(400).json({ message: "id is missing!" });
      }
    } catch (error) {
      console.error("Error finding or creating a store", error);
      res
        .status(500)
        .json({ message: "Error finding or creating a store", error });
    }
  }
}
