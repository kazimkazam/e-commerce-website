import { CartProduct } from "./cartProduct.model";

export class Order {
    public user: { name: string, address: string, email: string };
    public cart: CartProduct[];
    public cost: number;
    public date: string;
    public uid?: string;
    public token?: string;

    constructor(
        user: { name: string, address: string, email: string }, 
        cart: CartProduct[],
        cost: number,
        date: string,
        uid: string,
        token: string
        ) {
        this.user = user;
        this.cart = cart;
        this.cost = cost;
        this.date = date;
        this.uid = uid;
        this.token = token;
    }
}