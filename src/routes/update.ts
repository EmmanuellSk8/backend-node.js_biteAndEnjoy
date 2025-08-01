import { ReservationDTO } from "../DTO/reservation.DTO";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReservation = async (req: any, res: any) => {
    if (req.method === "PUT") {
        const { id } = req.params
        const data = req.body as Partial<ReservationDTO>
        const { date } = req.body

        if (Object.entries(data).length === 0) {
            res.status(400).json({ error: 'No hay datos para actualizar' });
        }

        if (data.quantityPeople !== undefined && data.quantityPeople > 12) {
            res.status(400).json({ error: "el número de personas debe ser menor de 12" })
        }
        try {
            const existing = await prisma.reservations.findFirst({
                where: { date }
            })

            if (existing) {
                return res.status(409).json({ error: "Ya existe una reserva en esa fecha" })
            }

            const updatedReservations = await prisma.reservations.update({
                where: { id },
                data: {
                    name: data.name,
                    email: data.email,
                    cedula: data.cedula,
                    phoneNumber: data.phoneNumber,
                    date: data.date,
                    quantityPeople: data.quantityPeople
                }
            });

            res.status(200).json({ message: 'Reserva actualizada', reserva: updatedReservations });
        } catch (error) {
            console.log(`Error al actualizar la reserva, Error: ${error}`)
            res.status(500).json({ error: 'Error al actualizar la reserva' });
        }
    }
};

export default updateReservation