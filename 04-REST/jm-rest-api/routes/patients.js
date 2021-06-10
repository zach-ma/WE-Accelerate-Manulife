import express from "express";

import data from "../data.js";

const router = express.Router();

router.get("/patients", (req, res) => {
  res.json(data.patients).status(200);
});

// GET / patient/:id
router.get("/patient/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let patients = data.patients;
  let response = patients.find((patient) => patient.id === id);

  // error handler
  if (!response) {
    res.status(404).json({ message: `Patient with ID ${id} does not exist` });
  }

  // success
  res.json(response).status(200);
});

// POST /patients
router.post("/patients", (req, res) => {
  const id = data.patients.length + 1;
  const body = {
    id,
    ...req.body,
  };
  data.patients.push(body);
  res.json(body).status(200);
});

export default router;
