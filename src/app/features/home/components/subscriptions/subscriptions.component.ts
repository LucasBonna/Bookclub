import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models/subscription.model';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {


subs: Subscription[] = [
  {
    id: 1,
    description: 'Subscription 1',
    price: 79.90,
    type: 1,
  },
  {
    id: 2,
    description: 'Subscription 2',
    price: 89.90,
    type: 2,
  },
  {
    id: 3,
    description: 'Subscription 3',
    price: 99.90,
    type: 3,
  }
]

constructor (
  private router: Router,
  private productsService: ProductsService, ) { }

ngOnInit(): void {

}


productDetails(subscription: Subscription) {
  this.router.navigateByUrl(`products-detail/${subscription.id}`, { state: { subscription } });
}

}
