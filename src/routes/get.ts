import { prisma } from "../lib/prisma";

export const getReservations = async (req: any, res: any) => {
    if (req.method === "GET") {
        try {
            const reservations = await prisma.reservations.findMany();
            res.status(200).json(reservations);

        } catch (error) {
            console.log(`Error al obtener reservas, Error: ${error}`)
            res.status(500).json({error: "Error interno del servidor"});
        }
    };

}
export default getReservations