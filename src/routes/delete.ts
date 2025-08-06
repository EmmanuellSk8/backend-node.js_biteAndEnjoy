import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReservation = async (req: any, res: any) => {
    if (req.method === "DELETE") {
        const { id } = req.params;

        try {
            const reservation = await prisma.reservations.findUnique({
                where: { id }
            })

            if (!reservation) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }

            await prisma.reservations.delete({
                where: { id },
            })
            try {
                await fetch('http://localhost:5000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        clave: reservation.id,
                        name: reservation.name,
                        to_email: reservation.email,
                        date: reservation.date,
                        type: "action",
                        action: "eliminada"
                    }),
                });

            } catch (error) {
                console.error('Error enviando datos al otro servicio: ', error);
                return res.status(500).json({ error: 'Error al enviar datos' });
            }

            res.status(200).json({ message: 'reserva eliminada correctamente' });
        } catch (error) {
            console.log(`Error al eliminar la reserva, Error: ${error}`)
            res.status(500).json({ error: 'Error al eliminar la reserva' });
        }
    }
};

export default deleteReservation