import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';



@NgModule({
  declarations: [
    SubscriptionsComponent,
    HomeComponent,
    ProductsDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
