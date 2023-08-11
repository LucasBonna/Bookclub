import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://18.228.195.175:3000/users';

  constructor(private http: HttpClient) { }


  getUserByEmailAndPassword(email: string, password: string) {
    return this.http.post<{ message: string, user: User | undefined }>(`${this.baseUrl}/authenticate`, { email , password });
  }


  createUser(user: User) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/createUser`, user);
  }



}
