import { Router } from 'express';
import { Request, Response } from 'express';
import mysql, { Pool, RowDataPacket } from 'mysql2/promise';
import cors from 'cors';

const router = Router();
router.use(cors());

const pool: Pool = mysql.createPool({
  host: 'localhost',
  user: 'Lucas',
  password: '12345',
  database: 'db_clubedolivro',
});

router.post('/createSubscription', async (req: Request, res: Response) => {
  const { user_id, subscription_type, start_date, end_date, status } = req.body;

  try {
    const connection = await pool.getConnection();
    const query = `INSERT INTO subscriptions (user_id, subscription_type, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
    const values = [user_id, subscription_type, start_date, end_date, status];

    await connection.query(query, values);
    connection.release();

    res.status(200).json({ message: 'Assinatura inserida com sucesso.' });
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
    res.status(500).json({ message: 'Erro ao inserir assinatura.' });
  }
});

router.get('/checkSubscription', async (req: Request, res: Response) => {
  const userId = req.query.userId;
  const subscriptionType = req.query.subscriptionType;

  try {
    const connection = await pool.getConnection();
    const query = `SELECT * FROM subscriptions WHERE user_id = ? AND subscription_type = ? AND status = 'active'`;
    const values = [userId, subscriptionType];

    const [results] = await connection.query<RowDataPacket[]>(query, values);
    connection.release();

    const hasActiveSubscription = results.length > 0;

    res.status(200).json({ hasActiveSubscription, results });
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
    res.status(500).json({ message: 'Erro ao obter a assinatura.' });
  }
});

export default router;
