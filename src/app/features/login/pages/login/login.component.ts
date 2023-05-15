import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

id: number = 0;
email: string = '';
password: string = '';
isAdmin: boolean = true;
error = false;

constructor (
  private usersService: UsersService,
  private router: Router,
  ) { }

ngOnInit(): void {
}

authenticate() {
  const user = this.usersService.getUserByEmailAndPassword(this.email, this.password)
  if(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('home')
  } else {
    this.error = true;
  }
  const isAdmin = this.usersService.isUserAdmin(this.isAdmin)
  if(isAdmin && isAdmin == user) {
  sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
};
}


}
