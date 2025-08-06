import { prisma } from "../lib/prisma";

const getReservationByCedula = async (req: any, res: any) => {
    const { cedula } = req.params

    try {
        if (!cedula) {
            return res.status(400).json({ error: "Cédula no proporcionada" });
        }

        if (cedula) {
            const reservations = await prisma.reservations.findMany({
                where: { cedula }
            })
            if (!reservations || reservations.length === 0) {
                res.status(404).json({ error: "Reserva no encontrada" });
            }
            res.status(200).json(reservations);
        }
    } catch (error) {
        console.log(`Error al obtener la reserva, Error: ${error}`)
        res.status(400).json({ error: "Error al obtener la reserva" });
    }
};

export default getReservationByCedula