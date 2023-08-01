import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from 'src/app/features/home/models/books.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.scss']
})
export class ProductEditingComponent implements OnInit {
  book: Books | undefined;
  editingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.editingForm = this.formBuilder.group({
      isbn: [''],
      name: [''],
      autor: [''],
      editora: [''],
      quantity: [1],
      image: [''],
      type: [1],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = Number(params.get('id'));
      if (!isNaN(bookId)) {
        this.productsService.getBookById(bookId).subscribe(book => {
          this.book = book;
          this.populateForm();
        });
      }
    });
  }

  populateForm() {
    if (this.book) {
      this.editingForm.setValue({
        isbn: this.book.isbn,
        name: this.book.name,
        autor: this.book.autor,
        editora: this.book.editora,
        quantity: this.book.quantity,
        image: this.book.image,
        type: this.book.type
      });
    }
  }

  onSubmit() {
    if (this.editingForm && this.book) {
      const updatedBook: Books = {
        ...this.book,
        ...this.editingForm.value
      };

      this.productsService.bookEditing(updatedBook).subscribe(res => {
        console.log('Livro atualizado com sucesso!');
        this.router.navigateByUrl('product-management');
      })
    }
  }
}
