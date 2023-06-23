import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  permission: number = 0;
  errorMessage: string = '';
  success: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createUser() {
    const newUser: User = {
      id: 0, // O id será gerado pelo servidor, então pode ser 0
      name: this.name,
      email: this.email,
      password: this.password,
      permission: this.permission,
    };

    this.errorMessage = '';

    this.usersService.createUser(newUser).subscribe(
      response => {
        this.success = true;
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 2000);
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = 'O email informado já está registrado. Por favor, tente outro email!';
        } else {
          this.errorMessage = 'Ocorreu um erro ao criar o usuário. Por favor, tente novamente!';
        }
      }
    );
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }
}
