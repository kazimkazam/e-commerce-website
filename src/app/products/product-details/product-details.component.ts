import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/shared/models/cartProduct.model';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id!: number;

  product!: Product;

  productsAdded: number[] = [];
  productsAddedSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);

      this.product = this.productsService.getProduct(this.id);
    })

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
