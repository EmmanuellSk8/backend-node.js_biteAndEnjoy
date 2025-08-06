import { v4 as uuidv4 } from "uuid"
import { ReservationDTO } from "../DTO/reservation.DTO";
import { prisma } from "../lib/prisma";

const createReservation = async (req: any, res: any) => {
    const { name, cedula, date, email, phoneNumber, quantityPeople }: ReservationDTO = req.body;
    const backend_url = process.env.BACKEND_URL

    if (!name || !cedula || !email || !date || !phoneNumber || !quantityPeople) {
        res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    if (phoneNumber.toString().length < 7) {
        res.status(400).json({ error: "el número de teléfono es muy corto" })
    }

    if (cedula.toString().length < 7) {
        res.status(400).json({ error: "el número de teléfono es muy corto" })
    }

    if (quantityPeople > 15) {
        res.status(400).json({ error: "el número de personas debe ser menor de 16" })
    }

    try {
        const existing = await prisma.reservations.findFirst({
            where: { date }
        })

        if (existing) {
            return res.status(409).json({ error: "Ya existe una reserva en esa fecha" })
        }

        const newReservation = await prisma.reservations.create({
            data: {
                id: uuidv4().replace(/-/g, '').substring(0, 12),
                name: req.body.name,
                email: req.body.email,
                cedula: String(req.body.cedula),
                phoneNumber: String(req.body.phoneNumber),
                quantityPeople: String(req.body.quantityPeople),
                date: req.body.date,
            }
        })

        try {
            await fetch(`${backend_url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clave: newReservation.id,
                    name: newReservation.name,
                    to_email: newReservation.email,
                    date: newReservation.date,
                    type: "code",
                    action: "creada"
                }),
            });

        } catch (error) {
            console.error('Error enviando datos al otro servicio: ', error);
            return res.status(500).json({ error: 'Error al enviar datos' });
        }

        res.status(201).json({ message: 'Reservation created', res: newReservation });
    } catch (error) {
        console.error('Error creando la reserva:', error);
        return res.status(500).json({ error: 'Error creando la reserva' });
    }

};

export default createReservation