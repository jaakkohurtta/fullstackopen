import axios from "axios";

import { apiBaseUrl } from "../constants";
import { NewEntry, Entry } from "../types";

const addNewJournalEntry = async (id: string, entry: NewEntry) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

const entryService = {
  addNewJournalEntry,
};

export default entryService;
