import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(
  private router: Router) { }

user?: User;
isAdmin: boolean = false;


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
