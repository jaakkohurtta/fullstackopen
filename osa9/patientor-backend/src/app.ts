import express from "express";
import cors from "cors";

import pingRouter from "./routes/ping";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/ping", pingRouter);
app.use("/api/diagnosis", diagnosesRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
