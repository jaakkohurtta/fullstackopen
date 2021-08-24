import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});