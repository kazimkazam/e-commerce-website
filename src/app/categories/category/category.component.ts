import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartProduct } from 'src/app/shared/models/cartProduct.model';
import { Product } from 'src/app/shared/models/product.model';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: string = '';
  categoryTitle: string = '';

  // products: Product[] = [];
  categoryProducts: Product[] = [];
  subscription!: Subscription;

  cart: CartProduct[] = [];

  productsAdded: number[] = [];
  productsAddedSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      switch (params['category']) {
        case 'clothes':
          this.category = 'Ropas';
          this.categoryTitle = 'Clothes';
          break;
        case 'electronics':
        case 'shoes':
          this.category = params['category'].charAt(0).toUpperCase() + params['category'].slice(1);
          this.categoryTitle = params['category'].charAt(0).toUpperCase() + params['category'].slice(1);
          break;
        default:
          this.category = 'Ropas';
          this.categoryTitle = 'Clothes';
          break;
      };

      this.categoryProducts = this.productsService.getProducts().filter(product => {
        if (product.category.name === this.category) {
          return product;
        }
        return null;
      });
  
      this.subscription = this.productsService.productsChanged.subscribe(
        (products: Product[]) => {
          this.categoryProducts = products.filter(product => {
            if (product.category.name === this.category) {
              return product;
            }
            return null;
          });
        }
      );
    })

    this.productsAdded = this.cartService.getProductsAdded();

    this.productsAddedSub = this.cartService.productsAddedSub.subscribe(
      (products: number[]) => {
        this.productsAdded = products;
      }
    );

    this.cartService.checkItemsAlreadyOnCart();
  };

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
