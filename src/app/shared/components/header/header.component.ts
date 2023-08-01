import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Subscription } from 'src/app/features/home/models/subscription.model';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  subs: Subscription[] = [];


constructor(
  private router: Router,
  private subscriptionsService: SubscriptionsService) { }

user?: User;
isAdmin: boolean = false;
showSubsMenu: boolean = false;

onMouseEnter() {
  this.showSubsMenu = true;
}

onMouseLeave() {
  this.showSubsMenu = false;
}

onMenuClosed() {
  this.showSubsMenu = false;
}

ngOnInit(): void {
  const userSession = sessionStorage.getItem('user')
  if(userSession) {
    this.user = JSON.parse(userSession);
    this.isAdmin = this.user?.permission === 2;
  }
  this.subs = this.subscriptionsService.getSubscriptions();
}

navigateByUrl(url: string) {
  this.router.navigateByUrl(url);
}

logout() {
  sessionStorage.removeItem('user');
  this.router.navigateByUrl('login')
}

productDetails(subscription: Subscription) {
  this.router.navigateByUrl(`products-detail/${subscription.id}`, { state: { subscription } });
 setTimeout(() => {
  window.location.reload();
}, 100);
}
}
