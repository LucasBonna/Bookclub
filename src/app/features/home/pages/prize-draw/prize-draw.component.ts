import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Books } from '../../models/books.model';
import { ActivatedRoute } from '@angular/router';

interface BookItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
}

@Component({
  templateUrl: './prize-draw.component.html',
  styleUrls: ['./prize-draw.component.scss']
})
export class PrizeDrawComponent implements OnInit {
  books: Array<Books> = [];
  book?: Books;
  chosen?: boolean;

  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.getBooks().subscribe((books) => {
      this.books = books;
    });

    const checkChosen = localStorage.getItem('bookChosen');
    this.chosen = checkChosen ? true : false;

    const bookItem = JSON.parse(localStorage.getItem('bookChosen') || '{}');
    if (bookItem.id && bookItem.name && bookItem.image && bookItem.quantity) {
      this.book = bookItem;
    }
  }

  confirmBook(book: Books): void {
    const item: BookItem = {
      id: book.id,
      name: book.name,
      image: book.image,
      quantity: book.quantity
    };
    localStorage.setItem('bookChosen', JSON.stringify(item));
    this.book = item;
    this.chosen = true;
    book.quantity--;
    this.productsService.updateStock(book, book.quantity).subscribe(() => {
      console.log(`Quantidade ${book.quantity} do livro ${book.name} atualizada.`)
    });
  }
}

