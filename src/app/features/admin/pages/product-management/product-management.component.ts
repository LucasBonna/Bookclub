import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/features/home/models/books.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
  });

  constructor (
    private productsService: ProductsService,
    private router: Router,
  ) {}

  books: Array<Books> = [];

  livro?: Books;


  ngOnInit(): void{
    this.productsService.getBooks().subscribe((livro) => {
      this.books = livro})
  }

  deleteBook(bookId: number) {
    this.productsService.deleteBook(bookId).subscribe((res) => {
      window.location.reload()
    })
  }

  onSubmit() {
    const booksValue: any = this.bookForm.value;
    this.productsService.create(booksValue).subscribe((res) => {
      window.location.reload()
    })
  }
}
