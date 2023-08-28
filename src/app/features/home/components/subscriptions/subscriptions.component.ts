import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../models/subscription.model';
import { SubscriptionsService } from 'src/app/shared/services/subscriptions.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subs: Subscription[] = [];

  subscription: Subscription | null = null;

constructor (
  private router: Router,
  private subscriptionsService: SubscriptionsService,) { }

ngOnInit(): void {
  this.subs = this.subscriptionsService.getSubscriptions();
  this.subscription = history.state.subscription;
}


productDetails(subscription: Subscription) {
  this.router.navigateByUrl(`products-detail/${subscription.id}`, { state: { subscription } });
}

}
