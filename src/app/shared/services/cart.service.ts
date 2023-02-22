import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartProduct } from "../models/cartProduct.model";

@Injectable()
export class CartService {
    cart: CartProduct[] = [];

    cartTotalCost: number = 0;

    productsAdded: number[] = [];
    productsAddedSub = new Subject<number[]>();

    constructor(

    ) {}

    getCart() {
        return this.cart;
    }

    getCartCost() {
        return this.cartTotalCost;
    }

    addToCart(cartProduct: CartProduct) {
        this.cart.push(cartProduct);

        this.productsAdded.push(cartProduct.product.id);
        this.productsAddedSub.next(this.productsAdded);

        this.cartTotalCost += cartProduct.quantity * cartProduct.product.price;
    }

    removeFromCart(id: number) {
        this.cart = this.cart.filter(product => {
            if (product.product.id === id) {
                this.cartTotalCost -= product.quantity * product.product.price;

                const index = this.productsAdded.indexOf(id);
                if (index !== -1) {
                this.productsAdded.splice(index, 1);
                }

                return null;
            };
            return product;
        });

        this.productsAddedSub.next(this.productsAdded);
    }

    increaseQuantity(id: number) {
        this.cart.filter(product => {
            if (product.product.id === id) {
                product.quantity++;

                this.cartTotalCost += product.product.price;
            };
        });
    }

    decreaseQuantity(id: number) {
        this.cart.filter(product => {
            if (product.product.id === id && product.quantity > 0) {
                product.quantity--;

                this.cartTotalCost -= product.product.price;
            };
        });
    }

    clearCart() {
        this.cart = [];
        this.cartTotalCost = 0;

        this.productsAdded = [];
        this.productsAddedSub.next(this.productsAdded);
    }

    checkItemsAlreadyOnCart() {
        for (let product of this.cart) {
            if (product.quantity === 0) {
                // the product is removed from the cart as the user set its quantity to 0
                this.removeFromCart(product.product.id)
            }
        }
    }

    getProductsAdded() {
        return this.productsAdded;
    }
}