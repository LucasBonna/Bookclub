import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

constructor(private router: Router) { }

user?: User;

ngOnInit(): void {
  const userSessionStorage = sessionStorage.getItem('user');
  if(userSessionStorage) {
    this.user = JSON.parse(userSessionStorage);
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
