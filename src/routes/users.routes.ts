import { Router } from 'express';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mysql, { RowDataPacket } from 'mysql2';

const router = Router();

const pool = mysql.createPool({
    host: '127.0.0.1',      
    user: 'root',
    password: 'Livia2005!',  
    database: 'db_clubedolivro',
});

const connection = pool.promise();

router.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Query para buscar o usuário no banco de dados
  const query = `SELECT id, phone, name, email, password, permission FROM users WHERE email = ?`;
  const values = [email];

  try {
    const [results, _] = await connection.query<RowDataPacket[]>(query, values);

    if (Array.isArray(results) && results.length > 0) {
      const user = results[0];
      const storedHashedPassword = user.password;

      // Comparar a senha fornecida pelo usuário com o hash armazenado no banco de dados
      const isPasswordCorrect = await bcrypt.compare(password, storedHashedPassword);

      if (isPasswordCorrect) {
        // Se a senha estiver correta, retornar os detalhes do usuário na resposta
        const { password: userPassword, ...userData } = user; // Removendo a senha do objeto de resposta
        res.status(200).json({ message: 'Autenticação de usuário completada com sucesso!', user: userData });
      } else {
        res.status(401).json({ message: 'Autenticação de usuário não concluída.' });
      }
    } else {
      res.status(401).json({ message: 'Autenticação de usuário não concluída.' });
    }
  } catch (err) {
    console.error('Erro ao executar a consulta:', err);
    res.status(500).json({ message: 'Erro ao autenticar usuário.' });
  }
});


router.get('/all', async (req: Request, res: Response) => {
    // Query para buscar todos os usuários no banco de dados
    const query = 'SELECT * FROM users';

    try {
        const [results, _] = await connection.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ message: 'Erro ao obter usuários.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    // Query para buscar um usuário específico no banco de dados
    const query = `SELECT * FROM users WHERE id = ?`;
    const values = [id];

    try {
        const [results, _] = await connection.query(query, values);

        if (Array.isArray(results)) {
            if (results.length > 0) {
                const user = results[0];
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        } else {
            // Handle the case when the query returns an OkPacket
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ message: 'Erro ao obter usuário.' });
    }
});

router.post('/createUser', async (req: Request, res: Response) => {
    const { name, email, password, phone, permission } = req.body;

    try {
        // Verificar se o email já existe
        const emailExistsQuery = `SELECT * FROM users WHERE email = ?`;
        const emailExistsValues = [email];

        const [emailResults, _] = await connection.query(emailExistsQuery, emailExistsValues);

        if (Array.isArray(emailResults)) {
            if (emailResults.length > 0) {
                res.status(409).send({ message: 'O email informado já está registrado.' });
                return;
            }
        } else {
            // Handle the case when the query returns an OkPacket
            res.status(409).send({ message: 'O email informado já está registrado.' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir o usuário ao banco de dados
        const insertQuery = `INSERT INTO users (name, email, password, phone, permission) VALUES (?, ?, ?, ?, ?)`;
        const insertValues = [name, email, hashedPassword, phone, permission];

        await connection.query(insertQuery, insertValues);
        res.status(201).send({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({ message: 'Erro ao criar um usuário.' });
    }
});

export default router;
