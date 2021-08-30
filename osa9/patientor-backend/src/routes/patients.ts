import express from "express";

import typeNewPatient from "../utils/typeNewPatientRequest";
import {
  typeHealthCheckEntry,
  typeHospitalEntry,
  typeOccupationalHealthcareEntry,
} from "../utils/typeNewEntryRequest";
import patientsService from "../services/patientsService";
import entryService from "../services/entryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitiveData();
  res.json(patients);
});

router.post("/", (req, res) => {
  // console.log(req.body);

  const typedNewPatient = typeNewPatient(req.body);
  const newPatient = patientsService.createNewPatient(typedNewPatient);

  res.json(newPatient);
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);
  // console.log(patient);
  res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);

  let typedNewEntry;

  switch (req.body.EntryType) {
    case "HealthCheck":
      typedNewEntry = entryService.createNewEntry(
        typeHealthCheckEntry(req.body)
      );
      patient?.entries.unshift(typedNewEntry);
      break;
    case "Hospital":
      typedNewEntry = entryService.createNewEntry(typeHospitalEntry(req.body));
      patient?.entries.unshift(typedNewEntry);
      break;
    case "OccupationalHealthcare":
      typedNewEntry = entryService.createNewEntry(
        typeOccupationalHealthcareEntry(req.body)
      );
      patient?.entries.unshift(typedNewEntry);
      break;
    default:
      res.json(patient);
      break;
  }

  res.json(patient);
});

export default router;
