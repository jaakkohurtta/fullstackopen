import express from "express";

import typeNewPatient from "../utils/typeNewPatientRequest";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitiveData();
  res.json(patients);
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  console.log(patient);
  res.json(patient);
});

router.post("/", (req, res) => {
  // console.log(req.body);

  const typedNewPatient = typeNewPatient(req.body);
  const newPatient = patientsService.createNewPatient(typedNewPatient);

  res.json(newPatient);
});

export default router;
