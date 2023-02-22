import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../authentication/services/authentication.service';
import { Product } from '../shared/models/product.model';
import { ProductsService } from '../shared/services/products.service';
import { OrdersService } from '../shared/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription!: Subscription;

  products: Product[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authenticationService.user.subscribe(user => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.ordersService.fetchOrders(this.authenticationService.user.value?.id, this.authenticationService.user.value?.token);
      }
    });

    if (this.products.length === 0) {
      this.productsService.fetchProducts();
      this.products = this.productsService.getProducts();
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authenticationService.logout();
  }

  // --------------------------------------
  // handle search form

  onHandleSearch(input: HTMLInputElement) {
    if (input.value.length !== 0) {
      this.productsService.searchProducts(input.value);

      this.router.navigate([ '/searchresults' ]);
    }
  }
}
