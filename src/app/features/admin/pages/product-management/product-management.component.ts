import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Books } from 'src/app/features/home/models/books.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    editora: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
  });

  constructor (
    private productsService: ProductsService,
    private router: Router,
  ) {}

  books: Array<Books> = [];

  livro?: Books;

  livroExistente: boolean = false;


  ngOnInit(): void{
    this.productsService.getBooks().subscribe((livro) => {
      this.books = livro})
  }

  deleteBook(bookId: number) {
    this.productsService.deleteBook(bookId).subscribe((res) => {
      console.log('deleteBook() called with bookId:', bookId);
      window.location.reload()
    })
  }

  onSubmit() {
    const bookValue: any = this.bookForm.value;

    const livroExistente = this.books.some(book => book.isbn === bookValue.isbn);

    if (livroExistente) {
      this.livroExistente = true;
      return;
    }

    this.productsService.createProducts(bookValue).subscribe((res) => {
      window.location.reload();
    });
  }

  editBook(bookId: number) {
    this.router.navigate(['product-editing', bookId]);
  }
}
