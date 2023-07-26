import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { SubscriptionsService } from '../../services/subscriptions.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

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

navigateToSub(subId: number) {

}


ngOnInit(): void {
  const userSession = sessionStorage.getItem('user')
  if(userSession) {
    this.user = JSON.parse(userSession);
    this.isAdmin = this.user?.permission === 2;
  }
}

navigateByUrl(url: string) {
  this.router.navigateByUrl(url);
}

logout() {
  sessionStorage.removeItem('user');
  this.router.navigateByUrl('login')
}

}
