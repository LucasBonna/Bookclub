import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private baseUrl = 'http://localhost:3000/subscriptions';

  constructor(private http: HttpClient) { }

  createSubscription(subscriptionData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/createSubscription', subscriptionData);
  }


}
