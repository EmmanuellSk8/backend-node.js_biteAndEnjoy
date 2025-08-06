import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReservationById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: "ID incorrecto" });
        }

        const reservation = await prisma.reservations.findUnique({
            where: { id }
        });

        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        return res.status(200).json(reservation);

    } catch (error) {
        console.error(`Error al obtener la reserva, Error: ${error}`);
        return res.status(500).json({ error: 'Error del servidor' });
    }
};

export default getReservationById;