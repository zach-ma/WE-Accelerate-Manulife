import express from "express";

import data from "../data.js";

const router = express.Router();

router.get("/doctors", (req, res) => {
  res.json(data.doctors).status(200);
});

router.get("/doctor/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let doctors = data.doctors;
  let response = doctors.find((doctor) => doctor.id === id);

  if (!response) {
    res.status(404).json({ message: `Doctor with ID ${id} does not exist` });
  }

  res.json(response).status(200);
});

router.post("/doctors", (req, res) => {
  const id = data.doctors.length + 1;
  const body = {
    id,
    ...req.body,
  };
  data.doctors.push(body);
  res.json(body).status(200);
});

export default router;
