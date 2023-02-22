import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartProduct } from '../shared/models/cartProduct.model';
import { Product } from '../shared/models/product.model';
import { CartService } from '../shared/services/cart.service';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchTopic: string = '';
  searchResults: Product[] = [];

  searchTopicSub!: Subscription;
  searchResultsSub!: Subscription;

  cart: CartProduct[] = [];

  productsAdded: number[] = [];
  productsAddedSub!: Subscription;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.searchTopic = this.productsService.getSearchTopic();
    this.searchResults = this.productsService.getSearchResults();

    this.searchTopicSub = this.productsService.searchTopicChanged.subscribe(
      (topic: string) => {
        this.searchTopic = topic;
      }
    );

    this.searchResultsSub = this.productsService.searchResultsChanged.subscribe(
      (results: Product[]) => {
        this.searchResults = results;
      }
    );

    this.productsAdded = this.cartService.getProductsAdded();

    this.productsAddedSub = this.cartService.productsAddedSub.subscribe(
      (products: number[]) => {
        this.productsAdded = products;
      }
    );

    this.cart = this.cartService.getCart();

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
