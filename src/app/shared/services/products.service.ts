import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'config';
import { Books } from 'src/app/features/home/models/books.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.apiUrl;


  constructor(private HttpClient: HttpClient) { }

  getBooks() {
    return this.HttpClient.get<Array<Books>>(this.baseUrl + '/products/all');
  }

  getBookById(id: number) {
    return this.HttpClient.get<Books>(this.baseUrl + `/${id}`);
  }

  bookSelectionsInsert(bookSelectionData: any): Observable <any> {
    return this.HttpClient.post(this.baseUrl + '/products/bookSelectionInsert', bookSelectionData)
  }

  reduceStock(bookId: number) {
    return this.HttpClient.post(this.baseUrl + '/products/reduceStock/' + bookId, {});
  }

  getBooksByType(type: number) {
    return this.HttpClient.get<Array<Books>>(this.baseUrl + '/products/getByType/' + type);
  }

  createProducts(books: Books) {
    return this.HttpClient.post(this.baseUrl + '/products/createProduct', books);
  }

  deleteBook(id: number) {
    return this.HttpClient.delete(this.baseUrl + '/products/remove/' + id);
  }

  bookEditing(book: Books): Observable<any> {
    return this.HttpClient.post(this.baseUrl + '/products/edit/' + book.id, book)
  }
}
