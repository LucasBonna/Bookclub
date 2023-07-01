import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from 'src/app/features/home/models/books.model';
import { Subscription } from 'src/app/features/home/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string = 'http://localhost:3000/products';


  constructor(private HttpClient: HttpClient) { }

  getBooks() {
    return this.HttpClient.get<Array<Books>>(this.baseUrl + '/all');
  }

  getBookById(id: number) {
    return this.HttpClient.get<Books>(this.baseUrl + `/${id}`);
  }

  createProducts(books: Books) {
    return this.HttpClient.post(this.baseUrl + '/createProduct', books);
  }

  deleteBook(id: number) {
    return this.HttpClient.delete(this.baseUrl + '/remove/' + id);
  }

  updateStock(book: Books, quantity: number) {
    const updatedBook = { ...book, quantity };
    return this.HttpClient.put(this.baseUrl + '/updateQuantity/' + book.id, updatedBook);
  }


  update(book: Partial<Books>) {
    return this.HttpClient.put(this.baseUrl + '/update/' + book.id, book);
  }

  getPlanos() {
    return this.HttpClient.get<Array<Subscription>>(this.baseUrl + 'planos/all' );
  }
}
