import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './shared/services/products.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/services/authentication.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';
import { StoresComponent } from './stores/stores.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './shared/services/cart.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthenticationGuard } from './authentication/services/authentication.guard';
import { OrdersComponent } from './orders/orders.component';
import { OrdersService } from './shared/services/orders.service';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { SlideDirective } from './shared/directives/slide.directive';
import { CollapseDirective } from './shared/directives/collapse.directive';
import { HorizontalScrollDirective } from './shared/directives/horizontal-scroll.directive';
import { ProductsStartComponent } from './products/products-start/products-start.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    ProductDetailsComponent,
    ContactComponent,
    StoresComponent,
    HomeComponent,
    CartComponent,
    UserInfoComponent,
    OrdersComponent,
    DropdownDirective,
    SlideDirective,
    CollapseDirective,
    HorizontalScrollDirective,
    ProductsStartComponent,
    CategoriesComponent,
    CategoryComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ ProductsService, AuthenticationService, AuthenticationGuard, CartService, OrdersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
