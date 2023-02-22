# e-commerce website

The website is deployed and can be accessed through the link below:

## 

> The website is based on Angular and it delivers a single page application (SPA) that uses Firebase Authentication and Database features, and Bootstrap.

> The SPA depicts a mock e-commerce website.

All products shown on the website were fetched from "Platzi Fake Store API" ---> https://fakeapi.platzi.com

## Table of Contents

- [Development](#development);
- [How to Use](#how-to-use);
- [Screenshots](#screenshots);
- [Author](#author);
- [References](#references);
- [License](#license).

# Development

The SPA was coded using TypeScript and Angular. Firebase was used to build / manage the authentication and real-time database features.

The website is a mock e-commerce website. To have mock products to present in the website, mock / fake products were fetched from "Platzi Fake Store API" (https://fakeapi.platzi.com).

Platzi Fake Store API does not return the same products everytime, i.e., different names, ids... To make the products persistent, there was the need to store them in the database. Now we use the Firebase real-time database to fetch the available products which were taken from Platzi Fake Store API. This way, only the images will change, i.e., the links are the same but they will show a different image from time to time.

> Note:
> Most products will present names, images, prices, or any other info, that will most likely have no connection whatsoever... It is all mock / fake data.

- "typescript": "~4.9.4",
- "@angular/common": "^15.1.0",
- "@angular/compiler": "^15.1.0",
- "@angular/core": "^15.1.0",
- "@angular/forms": "^15.1.0",
- "@angular/platform-browser": "^15.1.0",
- "@angular/platform-browser-dynamic": "^15.1.0",
- "@angular/router": "^15.1.0",
- "bootstrap": "^5.2.3",
- "rxjs": "~7.8.0",
- "tslib": "^2.3.0",
- "zone.js": "~0.12.0"

Directives were coded to control certain functionalities, e.g., navbar collapse, navbar / button dropdown, horizontal scroll, and carousel slide.

Alerts are shown on the website when errors or something unexpected occurs. An alert component was coded to be mainly shown on authentication related features.

Additionally, a loading spinner component is used during the login / sign up while the information is processed. The html and css code related to the loading spinner itself was taken from (https://loading.io/css/).

Relatively to the forms present in the website, some were coded using the template-driven method and others using the reactive-driven method. Any submit button present in the website was coded to only be enabled if the forms or related inputs are valid, i.e., they respect a set of rules.

# How to Use

The website is a fake e-commerce website. In that sense, the website homepage presents some mock products that the store wants viewers to notice (using a carousel feature) and below it shows featured campaings presented with a horizontal scroll feature. The carousel feature automatically slides right every 5s, and the user can also slide right manually.

From here, the user can navigate to other pages by using the navigation tab (Products, Categories, Contact, Stores, and reenter Homepage) or the cart and login / sign up buttons. The cart button will redirect the user to the login page if he is unauthenticated.

> Every product image, when clicked, will navigate the user to the Product Details page.

When the user signs up, he will be automatically logged in afterwards. When authenticated, the user gains access to new features, more specifically: cart, user information and order history. The login / sign up button changes to a logout button when authentication is true.

The authentication page handles both login and sign up processes by updating itself accordingly. At the moment, authentication only includes the email / password authentication method.

If the user forgets his password, there is a "Forget password" button on login page which will start a process where an email is sent to the user with a link for him to reset his password.

In the user information page, the user is able to also start the process to reset his password. Additionally, the user can also choose to delete his account in this page.

In the Products, Categories, and Product Details page, under each product image is shown a "Add" button that allows the user to add the product to the cart. When clicked, the product is added to the cart (which is only accessible if authenticated) and a "X" red button is now shown under that product image. If the user clicks that "X" button, the product is removed from the cart.

While on the Cart page, all products that were added to the cart are presented there on the left side of the page. On the right side, the form to create a new order is presented. Here, the user can do the following actions with the products that are shown to be on the cart: remove them from the cart, and increase or decrease quantity. On top of the cart page is shown the total cost of the cart which is updated accordingly every time a user makes a cart related action.  

The website header also presents a search input. After the user clicks on the search button or presses the enter key while the search input is active, the search results page will be presented to the user while showing every product in the database that may be related with the search topic introduced. The search will only work if the search input is not empty.

# Screenshots

## Homepage

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/homepage.png?raw=true)

## Products page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/products_page.png?raw=true)

## Categories page

### Clothes page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/categories_clothes_page.png?raw=true)

### Electronics page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/categories_electronics_page.png?raw=true)

### Shoes page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/categories_shoes_page.png?raw=true)

## Products details page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/products_details_page.png?raw=true)

## Contact page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/contact_page.png?raw=true)

## Stores page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/stores_page.png?raw=true)

## Login / Sign Up page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/login_page.png?raw=true)

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/signup_page.png?raw=true)

## Cart page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/cart_createOrder_page.png?raw=true)

## Products added to the cart

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/whenProductsAdded.png?raw=true)

## User info page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/user_info_page.png?raw=true)

## Orders page

### Order history page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/order_history.png?raw=true)

### Order is placed page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/order_placed.png?raw=true)

## Search results page

![image](https://github.com/kazimkazam/e-commerce-website/blob/master/screenshots/search_results_page.png?raw=true)

# Author

[@kazimkazam](https://github.com/kazimkazam) (monsieurkazimkazam@gmail.com)

# References

- Website favicon: Flaticon ---> https://www.flaticon.com/free-icons/shop
- All products shown on the website were fetched from "Platzi Fake Store API" ---> https://fakeapi.platzi.com
- Loading spinner related html and css code ---> https://loading.io/css/ 

# Licence

MIT