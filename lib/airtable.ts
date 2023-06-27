import { CoffeeStoreTypes } from "@/pages";

const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("coffee-stores");

const getMinifiedRecord = (record: any) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records: any) => {
  return records.map((record: CoffeeStoreTypes) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id: any) => {
  const findCoffeeStoreRecord = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecord);
};

export { getMinifiedRecords, table, findRecordByFilter };
