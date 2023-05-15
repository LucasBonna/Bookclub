import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/login/pages/login/login.component';
import { ProductsDetailComponent } from './features/home/pages/products-detail/products-detail.component';
import { ProductManagementComponent } from './features/admin/pages/product-management/product-management.component';
import { PrizeDrawComponent } from './features/home/pages/prize-draw/prize-draw.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'products-detail/:subscriptionId', component: ProductsDetailComponent },
  { path: 'product-management', component: ProductManagementComponent},
  { path: 'prize-draw', component: PrizeDrawComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
