import { Product } from "src/app/shared/models/product.model"

export class CartProduct {
    public product: Product;
    public quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}