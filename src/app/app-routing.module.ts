import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationGuard } from './authentication/services/authentication.guard';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsStartComponent } from './products/products-start/products-start.component';
import { ProductsComponent } from './products/products.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { StoresComponent } from './stores/stores.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent, children: [
    { path: '', component: ProductsStartComponent },
    { path: ':id', component: ProductDetailsComponent },
  ] },
  { path: 'categories', component: CategoriesComponent, children: [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: ':category', component: CategoryComponent }
  ] },
  { path: 'contact', component: ContactComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'cart', component: CartComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'info', component: UserInfoComponent, canActivate: [ AuthenticationGuard ] },
  { path: 'orders', component: OrdersComponent, canActivate:[ AuthenticationGuard ] },
  { path: 'searchresults', component: SearchResultsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "**", redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
