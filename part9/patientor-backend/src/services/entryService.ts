import { v1 as uuidv1 } from "uuid";

import { Entry, NewEntry } from "../types";

const createNewEntry = (entryObj: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuidv1(),
    ...entryObj,
  };

  return newEntry;
};

export default {
  createNewEntry,
};
