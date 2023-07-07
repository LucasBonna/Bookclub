import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentConfirmationComponent } from './pages/payment-confirmation/payment-confirmation.component';



@NgModule({
  declarations: [
    ProductManagementComponent,
    PaymentConfirmationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductManagementComponent
  ]
})
export class AdminModule { }
