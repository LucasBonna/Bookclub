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
    description: 'Plano Clubinho Bem Viver',
    price: 79.90,
    type: 1,
    image: 'https://yata.s3-object.locaweb.com.br/f69652aa4ce5925f4e2dbdca0ab4716db8feb5e70bc1d8feb384883119e5a77c',
  },
  {
    id: 2,
    description: 'Plano Clube Bem Viver',
    price: 89.90,
    type: 2,
    image: 'https://yata.s3-object.locaweb.com.br/014ce0f43b3f42e5edccf4d4b9e095af0ba6b2f1f92a465296dfad5fa3f0e073',
  },
  {
    id: 3,
    description: 'Plano Clube Bem Viver Pró',
    price: 99.90,
    type: 3,
    image: 'https://yata.s3-object.locaweb.com.br/893fae053669ad698591608ec0c8b59d79664b46b780b6935869975bb56615e5',
  }
]

constructor (private router: Router) { }

ngOnInit(): void {

}


productDetails(subscription: Subscription) {
  this.router.navigateByUrl(`products-detail/${subscription.id}`, { state: { subscription } });
}

}
