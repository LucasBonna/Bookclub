import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from '../../models/subscription.model';

@Component({
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {


  subscription?: Subscription;


constructor(
  private activatedRoute: ActivatedRoute,
  private productsService: ProductsService) {}

ngOnInit(): void {
  this.activatedRoute.params.subscribe((params) => {
    const id = parseInt(params['subscriptionId']);
    this.subscription = this.productsService.getById(id);
    console.log(this.subscription);
  })
}

}
