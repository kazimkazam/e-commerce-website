import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../authentication/models/user.model';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Order } from '../shared/models/order.model';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  ordersSubscription!: Subscription;

  user: User[] = [];

  constructor(
    private ordersService: OrdersService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.userData;

    this.orders = this.ordersService.getOrders();

    this.ordersSubscription = this.ordersService.ordersChanged.subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      }
    )

    // this is not needed because rules have been implemented on firebase to restrict access to data
    // but could be used as an extra step
    // this.orders = this.ordersService.getOrders().filter(order => {
    //   if (order.user.email === this.user[0].email) {
    //       return order;
    //   }
    //   return null;
    // });

    this.orders = this.orders.reverse();
  }
}
