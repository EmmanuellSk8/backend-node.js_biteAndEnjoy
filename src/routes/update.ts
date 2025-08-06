import { ReservationDTO } from "../DTO/reservation.DTO";
import { prisma } from "../lib/prisma";

const updateReservation = async (req: any, res: any) => {
    if (req.method === "PATCH") {
        const { id } = req.params
        const data = req.body as Partial<ReservationDTO>

        if (Object.entries(data).length === 0) {
            res.status(400).json({ error: 'No hay datos para actualizar' });
        }

        if (data.quantityPeople !== undefined && data.quantityPeople > 12) {
            res.status(400).json({ error: "el número de personas debe ser menor de 12" })
        }
        try {
            if (data.date) {
                const currentReservation = await prisma.reservations.findUnique({ where: { id } });

                if (currentReservation?.date !== data.date) {
                    const existing = await prisma.reservations.findFirst({
                        where: {
                            date: data.date,
                            NOT: { id },
                        }
                    });

                    if (existing) {
                        return res.status(409).json({ error: "Ya existe una reserva en esa fecha" });
                    }
                }
            }
            const updatedReservations = await prisma.reservations.update({
                where: { id },
                data: {
                    ...(data.name !== undefined && { name: data.name }),
                    ...(data.email !== undefined && { email: data.email }),
                    ...(data.cedula !== undefined && { cedula: String(data.cedula) }),
                    ...(data.phoneNumber !== undefined && { phoneNumber: String(data.phoneNumber) }),
                    ...(data.quantityPeople !== undefined && { quantityPeople: String(data.quantityPeople) }),
                    ...(data.date !== undefined && { date: data.date }),
                }
            });

            try {
                await fetch('http://localhost:5000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clave: updatedReservations.id,
                        name: updatedReservations.name,
                        to_email: updatedReservations.email,
                        date: updatedReservations.date,
                        type: "action",
                        action: "actualizada"
                    }),
                });

            } catch (error) {
                console.error('Error enviando datos al otro servicio: ', error);
                return res.status(500).json({ error: 'Error al enviar datos' });
            }

            res.status(200).json({ message: 'Reserva actualizada', reserva: updatedReservations });
        } catch (error) {
            console.log(`Error al actualizar la reserva, Error: ${error}`)
            res.status(500).json({ error: 'Error al actualizar la reserva' });
        }
    }
};

export default updateReservation