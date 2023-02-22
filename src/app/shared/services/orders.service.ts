import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "../models/order.model";

@Injectable()
export class OrdersService {
    orders: Order[] = [];
    ordersChanged = new Subject<Order[]>();

    constructor(
        private http: HttpClient
    ) {}

    addOrder(order: Order) {
        this.orders.push(order);

        this.storeOrders(order);
    }

    storeOrders(order: Order) {
        this.http.put(`https://awesom-7781b-default-rtdb.europe-west1.firebasedatabase.app/orders/${order.uid}.json?auth=${order.token}`, this.orders).subscribe();
    }

    fetchOrders(uid?: string, token?: string) {
        this.http.get< Order[] >(`https://awesom-7781b-default-rtdb.europe-west1.firebasedatabase.app/orders/${uid}.json?auth=${token}`)
        .subscribe(orders => {
            if (orders) {
                this.orders = orders;
                this.ordersChanged.next(orders);
            }
        });
    }

    getOrders() {
        return this.orders;
    }
}
