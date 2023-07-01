import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from '../../models/subscription.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {


subscription?: Subscription;

user?: User;

bought?: boolean;

constructor( private router: Router ) {}

ngOnInit(): void {
}

}
