import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../authentication/models/user.model';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { CartProduct } from '../shared/models/cartProduct.model';
import { Order } from '../shared/models/order.model';
import { CartService } from '../shared/services/cart.service';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: CartProduct[] = [];

  cartTotalCost: number = 0;

  user: User[] = [];

  orderCreated = false;

  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    this.cartTotalCost = this.cartService.getCartCost();

    this.user = this.authenticationService.userData;
  }

  ngOnDestroy(): void {
    this.orderCreated = false;
  }

  onIncreaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);

    this.cartTotalCost = this.cartService.getCartCost();
  }

  onDecreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);

    this.cartTotalCost = this.cartService.getCartCost();
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeFromCart(id);

    this.cartTotalCost = this.cartService.getCartCost();
  }

  onCreateOrder(cartForm: NgForm) {
    if (!cartForm.valid) {
      return;
    };

    if (this.cartTotalCost !== 0) {
      const newOrder: Order = {
        user: { name: cartForm.value.name, address: cartForm.value.address, email: this.user[0].email },
        cart: this.cart,
        cost: this.cartTotalCost,
        date: new Date().toLocaleString(),
        uid: this.authenticationService.user.value?.id,
        token: this.authenticationService.user.value?.token
      }

      this.ordersService.addOrder(newOrder);

      this.cartService.clearCart();

      this.cartTotalCost = this.cartService.getCartCost();
    }
    cartForm.reset();

    this.orderCreated = true;
  }
}
