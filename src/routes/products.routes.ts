import { Router, Request, Response } from 'express';
import { Books } from '../models/product.model';
import mysql, { Pool, OkPacket, RowDataPacket } from 'mysql2';

const router = Router();

const pool = mysql.createPool({
    host: '127.0.0.1',      
    user: 'Lucas',    
    password: '12345',  
    database: 'db_clubedolivro',
});

const connection = pool.promise();

router.get('/all', async (req: Request, res: Response) => {
    // Query para buscar todos os usuários no banco de dados
    const query = 'SELECT * FROM books';

    try {
        const [results, _] = await connection.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ message: 'Erro ao obter produtos.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    // Query para buscar um usuário específico no banco de dados
    const query = `SELECT * FROM books WHERE id = ?`;
    const values = [id];

    try {
        const [results, _] = await connection.query(query, values);

        if (Array.isArray(results)) {
            if (results.length > 0) {
                const user = results[0];
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Produto não encontrado.' });
            }
        } else {
            // Handle the case when the query returns an OkPacket
            res.status(404).json({ message: 'Produto não encontrado.' });
        }
    } catch (err) {
        console.error('Erro ao executar a consulta:', err);
        res.status(500).json({ message: 'Erro ao obter produto.' });
    }
});

router.post('/createProduct', async (req: Request, res: Response) => {
    const { id, isbn, name, autor, editora, quantity, image } = req.body;

    try {
        // Verificar se o livro já existe no sistema
        const isbnExistsQuery = `SELECT * FROM books WHERE isbn = ?`;
        const isbnExistsValues = [isbn];

        const [isbnResults, _] = await connection.query(isbnExistsQuery, isbnExistsValues);

        if (Array.isArray(isbnResults)) {
            if (isbnResults.length > 0) {
                res.status(409).send({ message: 'O isbn informado já está registrado.' });
                return;
            }
        } else {
            // Handle the case when the query returns an OkPacket
            res.status(409).send({ message: 'O isbn informado já está registrado.' });
            return;
        }

        // Inserir o usuário ao banco de dados
        const insertQuery = `INSERT INTO books (isbn, name, autor, editora, quantity, image) VALUES (?, ?, ?, ?, ?, ?)`;
        const insertValues = [isbn, name, autor, editora, quantity, image];

        await connection.query(insertQuery, insertValues);
        res.status(201).send({ message: 'Produto criado com sucesso!' });
    } catch (err) {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({ message: 'Erro ao criar o produto.' });
    }
});

router.delete('/remove/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        // Verificar se o livro existe antes de excluí-lo
        const bookExistsQuery = 'SELECT * FROM books WHERE id = ?';
        const bookExistsValues = [id];
        const [bookExistsResults, _] = await connection.query(bookExistsQuery, bookExistsValues);

        if (Array.isArray(bookExistsResults) && bookExistsResults.length === 0) {
            res.status(404).json({ message: 'O livro não foi encontrado.' });
            return;
        }

        // Excluir o livro do banco de dados
        const deleteQuery = 'DELETE FROM books WHERE id = ?';
        const deleteValues = [id];
        await connection.query(deleteQuery, deleteValues);

        res.status(200).json({ message: 'Livro excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({ message: 'Erro ao excluir o livro.' });
    }
});

export default router;