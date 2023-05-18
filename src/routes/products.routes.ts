import { Router, Request, Response } from 'express';
import { Books } from '../models/product.model';


const router = Router();

const books: Array<Books> = [
    {
        id: 1,
        name: 'Turma da Monica',
        image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQIx4VTWfofDdrQ5QgleJLqoLWZt8tlKfAsie1yDoMjMTDbp7jetso3xG6fQ1XzUgEqpZjA-JHidqN7X9QBfXnBwdrURosJR1f-7eLro2iUkhssEzaDybhRA79AVhIM7a4rlEg&usqp=CAc',
        quantity: 8,
    },
    {
        id: 2,
        name: 'Menino Maluquinho',
        image: 'https://m.media-amazon.com/images/I/911o1h5gIzL.jpg',
        quantity: 3,
    }
];

router.get('/all', (req: Request, res: Response) => {
    res.send(books);
});

router.get('/:id', (req: Request, res: Response) => {
    res.send(books.find((Book) => Book.id === parseInt(req.params.id)));
});

router.post('/create', (req: Request, res: Response) => {
    const Book = req.body;
    Book.id = (books[(books.length - 1)].id + 1);
    books.push(Book);
    res.status(201).send({ message: 'Produto criado com sucesso!' });

});

router.put('/updateQuantity/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const quantity = req.body.quantity;
  
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      res.status(404).send({ message: 'Livro não encontrado.' });
      return;
    }
  
    books[bookIndex].quantity = quantity;
    res.status(200).send({ message: 'Quantidade do livro atualizada com sucesso.' });
  });

router.put('/update/:id', (req: Request, res: Response) => {
    const Book = req.body;
    const id = parseInt(req.params.id);
    const booksIndex = books.findIndex((books) => books.id === id);
    if(booksIndex === -1) res.status(404).send({ message: 'Produto não encontrado para fazer atualização!' });
    Book[booksIndex] = books;
    res.status(200).send({ message: 'Produto atualizado com sucesso!' });
});

router.delete('/remove/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booksIndex = books.findIndex((books) => books.id === id);
    if(booksIndex === -1) res.status(404).send({ message: 'Produto não encontrado para fazer a remoção!' });
    books.splice(booksIndex, 1);
    res.status(200).send({ message: 'Produto excluído com sucesso!' });
});

export default router;