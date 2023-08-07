import { Router, Request, Response } from 'express';
import mysql, { Pool, OkPacket, RowDataPacket } from 'mysql2';
import cors from 'cors';

const router = Router();
router.use(cors());

const pool = mysql.createPool({
    host: 'db_clube.mysql.dbaas.com.br',      
    user: 'db_clube',    
    password: 'Peach217!',  
    database: 'db_clube',
});

const connection = pool.promise();

router.get('/all', async (req: Request, res: Response) => {
    // Query para buscar todos os livros no banco de dados
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

    // Query para buscar um livro específico no banco de dados
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

router.get('/getByType/:type', async (req: Request, res: Response) => {
    const bookType = parseInt(req.params.type);

    // Query para buscar todos os livros de determinado tipo no banco de dados
    const query = `SELECT * FROM books WHERE type = ?`;
    const values = [bookType]

    try {
        const [results, _] = await connection.query(query, values);
        res.status(200).json(results);
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).json({ message: 'Erro ao obter livros.' });
    }
});

router.post('/createProduct', async (req: Request, res: Response) => {
    const { id, isbn, name, autor, editora, quantity, image, type } = req.body;

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
        const insertQuery = `INSERT INTO books (isbn, name, autor, editora, quantity, image, type) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const insertValues = [isbn, name, autor, editora, quantity, image, type];

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

router.post('/reduceStock/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        // Verificar se o livro existe antes de alterá-lo
        const bookExistsQuery = 'SELECT * FROM books WHERE id = ?';
        const bookExistsValues = [id];
        const [bookExistsResults, _] = await connection.query(bookExistsQuery, bookExistsValues);

        if (Array.isArray(bookExistsResults) && bookExistsResults.length === 0) {
            res.status(404).json({ message: 'O livro não foi encontrado.' });
            return;
        }

        // Query de atualização de quantidade
        const updateQuery = 'UPDATE books SET quantity = quantity - 1 WHERE id = ?';
        const updateValues = [id];

        // Executar a query de atualização
        await connection.query(updateQuery, updateValues);

        res.status(200).json({ message: 'Quantidade do livro atualizada com sucesso!' });
    } catch (err) {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({ message: 'Erro ao atualizar a quantidade do livro.' });
    }
});

router.post('/bookSelectionInsert', async (req: Request, res: Response) => {
    const { bookId, subscriptionId, selectionDate } = req.body;

    try {
        // Verificar se o livro existe antes de alterá-lo
        const bookExistsQuery = 'SELECT * FROM books WHERE id = ?';
        const bookExistsValues = [bookId];
        const [bookExistsResults, _] = await connection.query(bookExistsQuery, bookExistsValues);

        if (Array.isArray(bookExistsResults) && bookExistsResults.length === 0) {
            res.status(404).json({ message: 'O livro não foi encontrado.' });
            return;
        }

        // Query de inserção no banco de dados
        const Query = `INSERT INTO book_selections (book_id, subscription_id, selection_date) VALUES (?, ?, ?)`;
        const values = [bookId, subscriptionId, selectionDate];
        
        await connection.query(Query, values);
        
        res.status(200).json({ message: 'Selection Inserida com sucesso ao banco de dados!' });
    } catch (err) {
        console.error('Erro ao executar a consulta.', err);
        res.status(500).json({ message: 'Erro ao inserir dados.' });
    }
})

router.post('/edit/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { isbn, name, autor, editora, quantity, image, type } = req.body;

    try {
        // Verificar se o livro existe antes de alterá-lo
        const bookExistsQuery = 'SELECT * FROM books WHERE id = ?';
        const bookExistsValues = [id];
        const [bookExistsResults, _] = await connection.query(bookExistsQuery, bookExistsValues);

        if (Array.isArray(bookExistsResults) && bookExistsResults.length === 0) {
            res.status(404).json({ message: 'O livro não foi encontrado.' });
            return;
        }

        // Construir a query de atualização dinamicamente
        let updateQuery = 'UPDATE books SET';
        const updateValues: any[] = [];

        if (isbn) {
            updateQuery += ' isbn = ?,';
            updateValues.push(isbn);
        }
        if (name) {
            updateQuery += ' name = ?,';
            updateValues.push(name);
        }
        if (autor) {
            updateQuery += ' autor = ?,';
            updateValues.push(autor);
        }
        if (editora) {
            updateQuery += ' editora = ?,';
            updateValues.push(editora);
        }
        if (quantity) {
            updateQuery += ' quantity = ?,';
            updateValues.push(quantity);
        }
        if (image) {
            updateQuery += ' image = ?,';
            updateValues.push(image);
        }
        if (type) {
            updateQuery += ' type = ?,';
            updateValues.push(type);
        }

        // Remover a vírgula extra do final da query
        updateQuery = updateQuery.slice(0, -1);

        // Adicionar o valor do ID ao array de valores
        updateValues.push(id);

        // Executar a query de atualização
        await connection.query(updateQuery + ' WHERE id = ?', updateValues);

        res.status(200).json({ message: 'Livro atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao executar a consulta', err);
        res.status(500).json({ message: 'Erro ao atualizar o livro.' });
    }
});



export default router;