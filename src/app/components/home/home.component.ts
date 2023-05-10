import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

// import { Subscription } from 'rxjs';
import { Product } from 'src/app/_models/product.model';
import { CartService } from 'src/app/_services/cart.service';
import { StoreService } from 'src/app/_services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  // selector: 'app-home', // Is that really necesary?
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit
// , OnDestroy
{
  loading = false;
  users?: User[];

  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  // productsSubscription: Subscription | undefined;


  constructor(
    private userService: UserService,

    private cartService: CartService,
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
    });

    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  // getProducts(): void {
  //   this.productsSubscription = this.storeService
  //     .getAllProducts(this.count, this.sort, this.category)
  //     .subscribe((_products) => {
  //       this.products = _products;
  //     });
  // }

  getProducts(): void {
    this.products = this.storeService.getAllProducts(this.category);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  // ngOnDestroy(): void {
  //   if (this.productsSubscription) {
  //     this.productsSubscription.unsubscribe();
  //   }
  // }
}
