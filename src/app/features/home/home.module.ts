import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailComponent } from './pages/products-detail/products-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrizeDrawComponent } from './pages/prize-draw/prize-draw.component';



@NgModule({
  declarations: [
    SubscriptionsComponent,
    HomeComponent,
    ProductsDetailComponent,
    PrizeDrawComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
