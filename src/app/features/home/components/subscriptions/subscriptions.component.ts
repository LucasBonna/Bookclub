import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models/subscription.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';
import { Books } from '../../models/books.model';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

subscriptions: Array<Subscription> = this.productsService.getSubscriptions();



constructor (
  private productsService: ProductsService,
  private router: Router) { }

ngOnInit(): void {

}

productDetails(subscriptionId: number) {
  this.router.navigateByUrl(`products-detail/${subscriptionId}`)
}

}
