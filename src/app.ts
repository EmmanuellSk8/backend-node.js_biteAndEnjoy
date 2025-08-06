import express from "express";
import createReservation from "./routes/create";
import updateReservation from "./routes/update";
import deleteReservation from "./routes/delete";
import getReservationById from "./routes/getById";
import getReservations from "./routes/get";
import getReservationByCedula from "./routes/getByCedula";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://biteandenjoy.netlify.app/'],
  credentials: true,
}));
app.use(express.json())
app.use('/api/create', createReservation)
app.use('/api/allDates', getReservations)
app.use('/api/get/user/:id', getReservationById)
app.use('/api/get/cedula/:cedula', getReservationByCedula)
app.use('/api/update/:id', updateReservation)
app.use('/api/delete/:id', deleteReservation)

export default app;