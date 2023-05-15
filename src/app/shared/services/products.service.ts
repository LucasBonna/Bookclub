import { Injectable } from '@angular/core';
import { Subscription } from 'src/app/features/home/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  subscriptions: Array<Subscription> = [
    {
      id: 1,
      description: 'Clubinho',
      price: 59
      },
      {
        id: 2,
        description: 'Clube',
        price: 79
      },
      {
        id: 3,
        description: 'Clubao',
        price: 99
        },
  ]


  constructor() { }

  getSubscriptions() {
    return this.subscriptions;
  }

  getById(id: number) {
    return this.subscriptions.find((subscription) => subscription.id === id );
  }
}
