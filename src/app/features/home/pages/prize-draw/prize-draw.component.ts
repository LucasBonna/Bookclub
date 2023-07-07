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

  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.getBooks().subscribe((books) => {
      this.books = books;
    });


    const bookItem = JSON.parse(localStorage.getItem('bookChosen') || '{}');
    if (bookItem.id && bookItem.name && bookItem.image && bookItem.quantity) {
      this.book = bookItem;
    }
  }

}

