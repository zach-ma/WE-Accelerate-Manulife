import express from "express";

import data from "../data.js";

const router = express.Router();

router.get("/visits", (req, res) => {
  let visits = data.visits;

  // http://localhost:3000/api/v1/visits?doctorid=1
  console.log(req.query); // { doctorid: '1' }

  // error handling missing

  // NOTE
  // const { doctorid } = req.query; // destructuring
  // // http://localhost:3000/api/v1/visits?doctorid=1

  const { doctorid, patientid } = req.query; // NOTE destructuring
  // http://localhost:3000/api/v1/visits?doctorid=1&patient=3

  console.log(doctorid); // 1
  if (doctorid) {
    visits = visits.filter((visit) => visit.doctorid === parseInt(doctorid));
  }

  if (patientid) {
    visits = visits.filter((visit) => visit.patientid === parseInt(patientid));
  }

  res.json(visits).status(200);
});

export default router;
