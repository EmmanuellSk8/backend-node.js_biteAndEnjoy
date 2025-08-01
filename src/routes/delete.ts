import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReservation = async (req: any, res: any) => {
    if (req.method === "DELETE") {
        const { id } = req.params;

        try {
            await prisma.reservations.delete({
                where: { id },
            })
            res.status(200).json({ message: 'reserva eliminada correctamente' });
        } catch (error) {
            console.log(`Error al eliminar la reserva, Error: ${error}`)
            res.status(500).json({ error: 'Error al eliminar la reserva' });
        }
    }
};

export default deleteReservation