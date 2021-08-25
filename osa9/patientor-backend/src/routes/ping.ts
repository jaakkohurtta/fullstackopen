import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("Someone pinged me!");
  res.send("pong");
});

export default router;