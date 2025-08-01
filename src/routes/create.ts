import { v4 as uuidv4 } from "uuid"
import { ReservationDTO } from "../DTO/reservation.DTO";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createReservation = async (req: any, res: any) => {
    const { name, cedula, date, email, phoneNumber, quantityPeople }: ReservationDTO = req.body;

    if (!name || !cedula || !email || !date || !phoneNumber || !quantityPeople) {
        res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    if (phoneNumber.toString().length < 7) {
        res.status(400).json({ error: "el número de teléfono es muy corto" })
    }

    if (cedula.toString().length < 7) {
        res.status(400).json({ error: "el número de teléfono es muy corto" })
    }

    if (quantityPeople > 12) {
        res.status(400).json({ error: "el número de personas debe ser menor de 12" })
    }

    try {
        const existing = await prisma.reservations.findFirst({
            where: { date }
        })

        if(existing){
            return res.status(409).json({error: "Ya existe una reserva en esa fecha"})
        }

        const newReservation = await prisma.reservations.create({
            data: {
                id: uuidv4(),
                name,
                email,
                cedula,
                phoneNumber,
                date,
                quantityPeople,
            }
        })

        res.status(201).json({ message: 'Reservation created', res: newReservation });
    } catch (error) {
        console.error('Error creando la reserva:', error);
        return res.status(500).json({ error: 'Error creando la reserva' });
    }

};

export default createReservation