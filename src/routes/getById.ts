import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReservationById = async (req: any, res: any) => {
    const { id } = req.query;
    try {
        if (!id) {
            return res.status(400).json({ message: "ID no proporcionado" });
        }

        if (id) {
            const reservation = await prisma.reservations.findUnique({
                where: { id }
            })
            if (!reservation) {
                res.status(404).json({ message: "reserva no encontrada" });
            }

            res.status(200).json(reservation);
        }
    } catch (error) {
        console.log(`Error al obtener la reserva, Error: ${error}`)
        res.status(404).json({ error: 'No se encontró la reserva' });
    }
};

export default getReservationById