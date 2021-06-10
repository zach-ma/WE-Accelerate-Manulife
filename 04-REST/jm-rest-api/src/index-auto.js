"use strict";

import express from "express";

import doctors from "../routes/doctors.js";
import patients from "../routes/patients.js";
import visits from "../routes/visits.js";

import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());

app.use("/api/v1", doctors);
app.use("/api/v1", patients);
app.use("/api/v1", visits);

app.listen(PORT, () => {
  console.log(`I'm alive and listening on port: ${PORT} !!!`);
});
