import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProduct } from '../../shared/models/cartProduct.model';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products-start',
  templateUrl: './products-start.component.html',
  styleUrls: ['./products-start.component.css']
})
export class ProductsStartComponent implements OnInit {
  products: Product[] = [];
  subscription!: Subscription;
  
  cart: CartProduct[] = [];

  productsAdded: number[] = [];
  productsAddedSub!: Subscription;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();

    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );

    this.cart = this.cartService.getCart();

    this.productsAdded = this.cartService.getProductsAdded();

    this.productsAddedSub = this.cartService.productsAddedSub.subscribe(
      (products: number[]) => {
        this.productsAdded = products;
      }
    );

    this.cartService.checkItemsAlreadyOnCart();
  }

  onAddToCart(id: number) {
    if (this.productsAdded.indexOf(id) === -1) {
      // productsAdded.push is done on the cart service
      // this.productsAdded.push(id);

      const cartProduct: CartProduct = {
        product: this.productsService.getProduct(id),
        quantity: 1
      }
      
      this.cartService.addToCart(cartProduct);
    }
  }

  onRemoveFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
