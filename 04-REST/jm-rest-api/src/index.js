"use strict";

// import express library
import express from "express";
// const express = require("express");

// import data.js
import data from "../data.js"; // should be ./data.js if data.js is in current dir

// NOTE import swagger
// UNCOMMENT
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
// import swaggerYaml from "../swagger.yaml";

// create an app object with all the express methods stored
const app = express();
const PORT = process.env.PORT || 3000;

// NOTE middleware function: between client request and server
app.use(express.json());

// UNCOMMENT
// NOTE
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// everything like app.xxx() is a middleware funciton call

// get inoformation
// req: response
app.get("/", (req, res) => {
  // 1. path 2. callback func
  res.json({ message: "Hello World Manulife UW " }); // json will convert everything to json format
});

/////////////////////////////////
// doctors endpoints
/*
 * Create end points or Routes to get doctor & visits information
 * we will be leveraging the data file
 */
// api/v1/doctors
app.get("/api/v1/doctors", (req, res) => {
  res.json(data.doctors).status(200);
});

// NOTE
// getting specific doctor:
// api/v1/doctor/id
// http://localhost:3000/api/v1/doctor/1
app.get("/api/v1/doctor/:id", (req, res) => {
  // console.log(req.params); // we will see in terminal {id : '1'}
  let id = parseInt(req.params.id);
  let doctors = data.doctors;
  let response = doctors.find((doctor) => doctor.id === id);

  // NOTE error handling:
  if (!response) {
    res.status(404).json({ message: `Doctor with ID ${id} does not exist` });
  }

  // success:
  res.json(response).status(200); // will see { id: 1, name: 'Jeff Anderson' } when id=1
});

// NOTE post new doctor
app.post("/api/v1/doctors", (req, res) => {
  const id = data.doctors.length + 1;
  const body = {
    id, // 4
    ...req.body, // NOTE Doctor who
  };
  data.doctors.push(body);
  res.json(body).status(200);
});

/////////////////////////////////
/////////////////////////////////
// Individual exercise

/////////////////////////////////
// Add similar endpoints for the patients

// GET / patients
app.get("/api/v1/patients", (req, res) => {
  res.json(data.patients).status(200);
});

// GET / patient/:id
app.get("/api/v1/patient/:id", (req, res) => {
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
app.post("/api/v1/patients", (req, res) => {
  const id = data.patients.length + 1;
  const body = {
    id,
    ...req.body,
  };
  data.patients.push(body);
  res.json(body).status(200);
});

/////////////////////////////////
// Get a list of visits by doctor id, patient id, or both

// NOTE
app.get("/api/v1/visits", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`I'm alive and listening on port: ${PORT} !!!`);
});
