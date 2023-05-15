import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from 'src/app/features/home/models/books.model';
import { Subscription } from 'src/app/features/home/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = 'http://localhost:3000';

  options = {
    headers: {
      'content-type': 'application/json'
    }
  };

  subscriptions: Array<Subscription> = [
    {
      id: 1,
      description: 'Clubinho',
      price: 59
      }
  ]

    books: Array<Books> = []



  constructor(private HttpClient: HttpClient) { }

  getBooks() {
    return this.HttpClient.get<Array<Books>>(this.baseUrl + '/products/all', this.options);
  }

  getSubscriptions() {
    return this.subscriptions;
  }

  getById(id: number) {
    return this.subscriptions.find((subscription) => subscription.id === id );
  }


  getBookById(id: number): Observable<Books> {
    return this.HttpClient.get<Books>(this.baseUrl + `/products/${id}`, this.options);
  }
  create(books: Books) {
    return this.HttpClient.post(this.baseUrl + '/products/create', books, this.options);
  }

  deleteBook(id: number) {
    return this.HttpClient.delete(this.baseUrl + '/products/remove/' + id, this.options);
  }

  updateStock(book: Books, quantity: number) {
    const updatedBook = { ...book, quantity };
    return this.HttpClient.put(this.baseUrl + '/products/updateQuantity/' + book.id, updatedBook, this.options);
  }


  update(book: Partial<Books>) {
    return this.HttpClient.put(this.baseUrl + '/products/update/' + book.id, book, this.options);
  }

  generateNextId() {
    return this.books[(this.books.length - 1)].id + 1;
  }

  getBookId() {
    return this.books.find((books) => books.id)
  }
}
