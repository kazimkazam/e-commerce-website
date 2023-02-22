import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  subscription!: Subscription;

  promotions: Product[] = [];

  featured: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();

    this.promotions = this.products.slice(0, 5);

    this.featured = this.products.slice(10, 40);

    this.subscription = this.productsService.productsChanged.subscribe(
      (products: Product[]) => {
        this.products = products;

        this.promotions = this.products.slice(0, 5);

        this.featured = this.products.slice(10, 40);
      }
    );
  }
}
