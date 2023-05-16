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
isAdmin?: User;
isBought?: boolean;

ngOnInit(): void {
  const userSessionStorage = sessionStorage.getItem('user');
  if(userSessionStorage) {
    this.user = JSON.parse(userSessionStorage);
  };
  const adminSessionStorage = sessionStorage.getItem('isAdmin');
  if(adminSessionStorage) {
  this.isAdmin = JSON.parse(adminSessionStorage)
  }
  const isboughtLocalStorage = localStorage.getItem('bought')
  if( isboughtLocalStorage == userSessionStorage) {
    this.isBought = true;
  } else {
    this.isBought = false;
  }
}

navigateByUrl(url: string) {
  this.router.navigateByUrl(url);
}

logout() {
  sessionStorage.clear();
  this.router.navigateByUrl('login')
}

}
