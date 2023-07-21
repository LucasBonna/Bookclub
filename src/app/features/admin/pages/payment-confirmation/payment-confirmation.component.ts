import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { SubscriptionsService } from 'src/app/shared/services/subscriptions.service';
import { addMonths, format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

@Component({
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private subscriptionsService: SubscriptionsService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.insertSubscription();
  }


  insertSubscription() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    const timeZone = 'America/Sao_Paulo';

    const startDate = format(zonedTimeToUtc(new Date(), timeZone), 'yyyy-MM-dd HH:mm:ss');
    const endDate = format(addMonths(zonedTimeToUtc(new Date(), timeZone), 1), 'yyyy-MM-dd HH:mm:ss');
    const subscriptionData = {
      user_id: user.id,
      subscription_type: this.getSubscriptionTypeFromUrl(),
      start_date: startDate,
      end_date: endDate,
      status: 'active',
    };

    this.subscriptionsService.createSubscription(subscriptionData).subscribe(
      response => {
        console.log('Assinatura inserida com sucesso no banco de dados.');
      },
      error => {
        console.error('Erro ao inserir assinatura no banco de dados:', error);
      }
    );
  }

  getSubscriptionTypeFromUrl(): number {
    const urlParts = this.router.url.split('/');
    const urlLastPart = urlParts[urlParts.length - 1];
    return parseInt(urlLastPart, 10);
  }

  navigateToHome() {
    this.router.navigateByUrl('home')
  }


}
