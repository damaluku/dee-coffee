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

export { getMinifiedRecords, table };
