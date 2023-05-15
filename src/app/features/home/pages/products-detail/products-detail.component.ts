import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from '../../models/subscription.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {


subscription?: Subscription;


bought?: boolean;

constructor(
  private activatedRoute: ActivatedRoute,
  private router: Router,
  private productsService: ProductsService,
  private usersService: UsersService) {}

ngOnInit(): void {
  this.activatedRoute.params.subscribe((params) => {
    const id = parseInt(params['subscriptionId']);
    this.subscription = this.productsService.getById(id);
    const user = sessionStorage.getItem('user');
    const bought = localStorage.getItem('bought');
    if(user == bought) {
      this.bought = true
    } else {
      this.bought = false
    }
  })
}

buySubscription() {
  const user = sessionStorage.getItem('user');
  if(user) {
    localStorage.setItem('bought', (user))
    window.location.reload();
  } else {
    alert('Você precisa estar logado para comprar uma assinatura!')
  }
}

cancelSubscription() {
  localStorage.removeItem('bought')
  window.location.reload();
}

}
