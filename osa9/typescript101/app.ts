/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get("/bmi", (req, res) => {
  // console.log(req.query)
  
  const { height, weight } = req.query;

  if(!height || ! weight || isNaN(Number(height)) || isNaN(Number(weight)) || Object.keys(req.query).length !== 2) {
    return res.status(400).json({ error: "Invalid query parameters." });
  }

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: calculateBmi(Number(height), Number(weight))
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily_exercises: any[] = req.body.daily_exercises;

  if(!target || !daily_exercises) {
    return res.status(400).json({ error: "Parameters missing" });
  }
  if(isNaN(Number(target)) || daily_exercises.some(isNaN) || daily_exercises.some(e => typeof e === "boolean") || typeof daily_exercises !== "object" || Object.keys(req.body).length !== 2) {
    return res.status(400).json({ error: "Malformatted parameters" });
  }

  const result = exerciseCalculator(Number(target), daily_exercises.map((e: number | string) => Number(e)));

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});