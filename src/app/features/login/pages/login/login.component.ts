import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

email: string = '';
password: string = '';
error = false;

constructor (
  private usersService: UsersService,
  private router: Router,
  ) { }

ngOnInit(): void {
}

authenticate() {
  this.usersService.getUserByEmailAndPassword(this.email, this.password).subscribe(
    response => {
      sessionStorage.setItem('user', JSON.stringify(response.user));
      this.router.navigateByUrl('home');
    },
    error => {
      this.error = true;
    }
  );
}


navigateToSignup() {
  this.router.navigateByUrl('signup');
}

}
