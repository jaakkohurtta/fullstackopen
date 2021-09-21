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

  // console.log(req.body);

  let typedNewEntry;

  switch (req.body.type) {
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
      if (
        req.body.sickLeave &&
        req.body.sickLeave.startDate === "" &&
        req.body.sickLeave.endDate === ""
      ) {
        delete req.body.sickLeave;
      }
      typedNewEntry = entryService.createNewEntry(
        typeOccupationalHealthcareEntry(req.body)
      );
      patient?.entries.unshift(typedNewEntry);
      break;
    default:
      break;
  }

  res.json(typedNewEntry);
});

export default router;
