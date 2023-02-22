import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

import { Product } from "../models/product.model";


@Injectable()
export class ProductsService {
    products: Product[] = [];
    productsChanged = new Subject<Product[]>();

    searchTopic: string = '';
    searchResults: Product[] = [];

    searchTopicChanged = new Subject<string>();
    searchResultsChanged = new Subject<Product[]>();

    constructor(
        private http: HttpClient
    ) {}

    // fetch products from firebase
    fetchProducts() {
        this.http.get< Product[] >('https://awesom-7781b-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        .subscribe(products => {
            this.products = products;
            this.productsChanged.next(products);
        });
    }

    getProducts() {
        // return this.products.slice();
        return this.products;
    }

    getProduct(id: number): Product {
        // using index does not work as the products fetch does not always return a response with products starting at product #0 or #1
        // return this.products[index];
        const product = this.products.filter(product => {
            if (product.id === id) {
                return product;
            }
            return null;
        });

        return product[0];
    }

    searchProducts(searchTopic: string) {
        this.searchTopic = searchTopic;
        this.searchTopicChanged.next(searchTopic);

        let results = this.products.filter(product => {
            if (
            product.category.name.toLowerCase().includes(searchTopic.toLowerCase()) || 
            product.description.toLowerCase().includes(searchTopic.toLowerCase()) || 
            product.title.toLowerCase().includes(searchTopic.toLowerCase())
            ) {
                return product;
            }
            return null;
        });

        this.searchResults = results;
        this.searchResultsChanged.next(results);
    }

    getSearchTopic() {
        return this.searchTopic;
    }

    getSearchResults() {
        return this.searchResults;
    }

    // ----------------------------------------------------------------------------------------------
    // to make the products persistent, there was the need to store them in the database
    // because Platzi Fake Store API does not return the same products everytime (different names, ids...), and more importantly, the products ids not always start at 1
    // which could make the website run into unwanted issues
    // now we use the firebase to fetch the available products which were taken from Platzi Fake Store API
    // this way, only the images will change, i.e., the links are the same but they will show a different image from time to time

    // storeProductsOnDatabase() {
    //     this.http.put('https://awesom-7781b-default-rtdb.europe-west1.firebasedatabase.app/products.json', this.products).subscribe(response => {
    //         // console.log(response);
    //     });
    // }

    // fetch products and categories from Platzi Fake Store API
    // fetchProducts() {
    //     return this.http.get< Product[] >('https://api.escuelajs.co/api/v1/products?offset=0&limit=180')
    //     .subscribe(products => {
    //         this.products = products;
    //         this.productsChanged.next(products);
    //     });
    // }

    // fetchCategories() {
    //     return this.http.get< Category[] >('https://api.escuelajs.co/api/v1/categories')
    //     .subscribe(categories => {
    //         this.categories = categories;
    //         this.categoriesChanged.next(categories);
    //     });
    // }
}

// categories from Platzi Fake Store API
// [{"id":1,"name":"Ropas","image":"https://firebasestorage.googleapis.com/v0/b/platzi-store-forms.appspot.com/o/categories%2Fmhh.jpg?alt=media&token=45034dd4-849d-42b4-a72a-149676f41773","creationAt":"2023-02-16T20:51:58.000Z","updatedAt":"2023-02-16T20:55:04.000Z"},{"id":2,"name":"Electronics","image":"https://api.lorem.space/image/watch?w=640&h=480&r=7391","creationAt":"2023-02-16T20:51:58.000Z","updatedAt":"2023-02-16T20:51:58.000Z"},{"id":3,"name":"TUTUCA","image":"https://api.lorem.space/image/furniture?w=640&h=480&r=9619","creationAt":"2023-02-16T20:51:58.000Z","updatedAt":"2023-02-16T21:59:45.000Z"},{"id":4,"name":"Shoes","image":"https://api.lorem.space/image/shoes?w=640&h=480&r=8386","creationAt":"2023-02-16T20:51:58.000Z","updatedAt":"2023-02-16T20:51:58.000Z"},{"id":5,"name":"Science","image":"https://api.lorem.space/image?w=640&h=480&r=1552","creationAt":"2023-02-16T20:51:58.000Z","updatedAt":"2023-02-16T21:08:57.000Z"},{"id":6,"name":"Animal","image":"https://firebasestorage.googleapis.com/v0/b/platzi-store-forms.appspot.com/o/categories%2Favatar2.png?alt=media&token=10b1d01c-e51b-439c-b193-dcc605ac4619","creationAt":"2023-02-16T21:09:14.000Z","updatedAt":"2023-02-16T21:09:14.000Z"}]