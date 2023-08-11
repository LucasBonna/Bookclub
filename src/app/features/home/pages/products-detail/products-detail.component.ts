import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from '../../models/subscription.model';

@Component({
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  subscription: Subscription | null = null;
  hasActiveSubscription: boolean = false;
  purchaseLinks: { [key: number]: string } = {
    1: 'http://pag.ae/7ZEQ6n7hK',
    2: 'http://pag.ae/7ZEQ68nju',
    3: 'http://pag.ae/7ZEQ6n7hK',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.subscription = history.state.subscription;
    this.checkSubscription();
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  async navigateToPurchase(): Promise<void> {
    const userId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    const subscriptionType = this.subscription?.type;

    if (userId && subscriptionType) {
      try {
        const params = new HttpParams().set('userId', userId).set('subscriptionType', subscriptionType.toString());
        const response: any = await this.http.get(`http://18.228.195.175:3000/subscriptions/checkSubscription`, { params }).toPromise();
        const hasActiveSubscription = response?.hasActiveSubscription as boolean || false;

        if (hasActiveSubscription) {
          this.hasActiveSubscription = true;
        } else {
          const purchaseLink = this.purchaseLinks[subscriptionType];
          if (purchaseLink) {
            window.open(purchaseLink, '_blank');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar a assinatura: ', error);
      }
    }
  }

  async checkSubscription(): Promise<void> {
    const userId = JSON.parse(sessionStorage.getItem('user') || '{}').id;
    const subscriptionType = this.subscription?.type;

    if (userId && subscriptionType) {
      try {
        const params = new HttpParams().set('userId', userId).set('subscriptionType', subscriptionType.toString());

        const response: any = await this.http.get(`https://node-api-teste.onrender.com/subscriptions/checkSubscription`, { params }).toPromise();

        const hasActiveSubscription = response?.hasActiveSubscription as boolean || false;
        const results = response?.results || [];

        if (hasActiveSubscription) {
          this.hasActiveSubscription = true;
        }
      } catch (error) {
        console.error('Erro ao verificar a assinatura: ', error);
      }
    }
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
