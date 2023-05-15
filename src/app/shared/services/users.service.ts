import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Array<User> = [
    {
      id: 1,
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: '12345',
      isAdmin: true
    },
    {
      id: 2,
      name: 'bonna',
      email: 'bonna@gmail.com',
      password: '12345',
      isAdmin: false
    }
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUserByEmailAndPassword(email: string, password: string) {
    return this.users.find((user) => user.email === email && user.password === password);
  }
}
