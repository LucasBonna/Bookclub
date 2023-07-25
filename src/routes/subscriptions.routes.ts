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

router.get('/getUserSubscription/:userId', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const connection = await pool.getConnection();
    // Query para buscar uma assinatura válida do usuário no banco de dados
    const query = `SELECT subscription_id, subscription_type FROM subscriptions WHERE user_id = ? AND status = 'active' AND end_date >= NOW() ORDER BY start_date DESC LIMIT 3`;
    const values = [userId];

    const [results, _] = await connection.query<RowDataPacket[]>(query, values);
    connection.release();

    const validSubscriptions = results.map((row) => ({
      subscription_id: row.subscription_id,
      subscription_type: row.subscription_type,
    }));

    res.status(200).json({ validSubscriptions });
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
    res.status(500).json({ message: 'Nenhuma assinatura válida encontrada.' });
  }
});

router.get('/checkBookSelection/:subscription_Id', async (req: Request, res: Response) => {
  const subscription_id = parseInt(req.params.subscription_Id);

  try {
    const connection = await pool.getConnection();
    // Query para buscar uma Book Selection daquela assinatura
    const query = `SELECT * FROM book_selections WHERE subscription_id = ?`
    const values = [subscription_id];
    
    const [results, _] = await connection.query<RowDataPacket[]>(query, values);
    connection.release();

    const bookSelected = results.length > 0 ? results[0].book_id : null;

    res.status(200).json({ bookSelected });
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
    res.status(500).json({ message: 'Nenhum livro foi escolhido ainda!' });
  }
});

export default router;
