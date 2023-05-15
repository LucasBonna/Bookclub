import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Array<User> = [
    {
      id: 1,
      name: 'bonna',
      email: 'bonna@gmail.com',
      password: '12345',
      isAdmin: false,
    },
    {
      id: 2,
      name: 'Lucas',
      email: 'lucas@gmail.com',
      password: '12345',
      isAdmin: true,
    }
  ];

  constructor() { }

  getUsers() {
    return this.users;
  }

  getUserByEmailAndPassword(email: string, password: string) {
    return this.users.find((user) => user.email === email && user.password === password)

  }

  isUserAdmin(isAdmin: boolean) {
    return this.users.find((val) => val.isAdmin === isAdmin && isAdmin == true);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id)
  }
}
