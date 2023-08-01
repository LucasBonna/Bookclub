import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionsService } from 'src/app/shared/services/subscriptions.service';
import { Books } from '../../models/books.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import  swal  from 'sweetalert2'

@Component({
  templateUrl: './book-selection.component.html',
  styleUrls: ['./book-selection.component.scss']
})
export class BookSelectionComponent implements OnInit {

  constructor (
    private productsService: ProductsService,
    private router: Router,
  ) { }

  books: Array<Books> = [];

  bookType!: number;
  subscriptionId!: number;

  ngOnInit(): void {
    const { subscriptionId, subscriptionType } = this.getSubscriptionIdAndTypeFromUrl();
    this.subscriptionId = subscriptionId
    this.bookType = subscriptionType

    this.getBooksFromType();
  }

  getBooksFromType() {
    this.productsService.getBooksByType(this.bookType).subscribe((resposta) => {
      this.books = resposta;
      console.log(this.books)
    })
  }

  confirmButton(bookId: number) {
    swal.fire({
      title: 'Tem certeza?',
      text: "Ao confirmar, só serpa possivel trocar o livro mês que vêm!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, escolher este livro!',
    }).then((result) => {
      if (result.isConfirmed) {

        swal.fire(
          'Livro Escolhido!',
          'Seu livro foi escolhido e será enviado para o endereço cadastrado!',
          'success'
        );

        this.bookSelectionInsert(bookId);

        this.router.navigateByUrl('prize-draw');
      }
    })
  }

  bookSelectionInsert(bookId: number) {
    const timeZone = 'America/Sao_Paulo';

    const { subscriptionId } = this.getSubscriptionIdAndTypeFromUrl();

    const selection_date = format(zonedTimeToUtc(new Date(), timeZone), 'yyyy-MM-dd HH:mm:ss');
    const bookSelectionData = {

      bookId: bookId,
      subscriptionId: subscriptionId,
      selectionDate: selection_date,
    };

    this.productsService.bookSelectionsInsert(bookSelectionData).subscribe(
      response => {
        console.log('Assinatura inserida com sucesso no banco de dados.');
        this.reduceStock(bookId);
      },
      error => {
        console.error('Erro ao inserir assinatura no banco de dados:', error);
      }
    );
  }

  reduceStock(bookId: number) {
    this.productsService.reduceStock(bookId).subscribe((response) => {
      console.log('Estoque atualizado com sucesso no banco de dados!');
    }, error => {
      console.error('Erro ao atualizar estoque no banco de dados.');
    });
  }

  getSubscriptionIdAndTypeFromUrl(): {subscriptionId: number, subscriptionType: number} {
    const urlParts = this.router.url.split('/');
    const urlLastPart = urlParts[urlParts.length - 1];
    const urlSecondToLastPart = urlParts[urlParts.length - 2];

    const subscriptionType = parseInt(urlLastPart, 10);
    const subscriptionId = parseInt(urlSecondToLastPart, 10);

    return { subscriptionId, subscriptionType };
  }
}
