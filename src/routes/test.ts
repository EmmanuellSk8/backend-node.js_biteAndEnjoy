import { prisma } from "../lib/prisma";

const testConnection = async (req: any, res: any) => {
  try {
    await prisma.$connect();
    res.status(200).json({ message: "Conexión exitosa a Supabase" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo conectar a Supabase" });
  }
};

export default testConnection;
