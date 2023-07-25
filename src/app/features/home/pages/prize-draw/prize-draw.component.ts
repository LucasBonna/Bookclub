import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Books } from '../../models/books.model';
import { SubscriptionsService } from 'src/app/shared/services/subscriptions.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: './prize-draw.component.html',
  styleUrls: ['./prize-draw.component.scss']
})
export class PrizeDrawComponent implements OnInit {
  books: Array<Books> = [];
  userId!: number;
  validSubscriptions: any[] = [];


  constructor(
    private productsService: ProductsService,
    private subscriptionService: SubscriptionsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productsService.getBooks().subscribe((books) => {
      this.books = books;
    });

    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id

      this.subscriptionService.getUserSubscription(this.userId).subscribe((response) => {
        this.validSubscriptions = response.validSubscriptions;
        console.log('Assinaturas válidas:', this.validSubscriptions);

        this.validSubscriptions.forEach((subscription: any) => {
          this.subscriptionService.checkBookSelection(subscription.subscription_id).subscribe((response) => {
            subscription.bookSelected = response.bookSelected;
            if (subscription.bookSelected !== null) {
              this.productsService.getBookById(subscription.bookSelected).subscribe((book) => {
                subscription.bookName = book.name;
              },
              (error) => {
                subscription.bookName = 'Erro ao obter informações do livro';
              });
            } else {
              subscription.bookName = 'Nenhum livro escolhido ainda!';
            }
          });
        });
      });
    }
  }

  gotoBookSelection(subscription_id: number, subscription_type: number) {
    this.router.navigate(['book-selection', subscription_id, subscription_type])
  }

}

