import { Client } from 'pg';

export default async function handler(req: any, res: any) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    res.json({ success: true, result });
  } catch (error: any) {
    res.json({ success: false, error: error.message });
  } finally {
    await client.end();
  }
}
