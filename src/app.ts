import express from "express";
import createReservation from "./routes/create";
import updateReservation from "./routes/update";
import deleteReservation from "./routes/delete";
import getReservationById from "./routes/getById";
import getReservations from "./routes/get";
import getReservationByCedula from "./routes/getByCedula";

const app = express();

app.use(express.json())
app.use('/api/create', createReservation)
app.use('/api/get', getReservations)
app.use('/api/get/user/:id', getReservationById)
app.use('/api/get/cedula/:cedula', getReservationByCedula)
app.use('/api/update/:id', updateReservation)
app.use('/api/delete/:id', deleteReservation)

export default app;