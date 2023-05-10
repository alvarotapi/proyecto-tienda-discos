﻿import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './_models/cart.model';
import { CartService } from './_services/cart.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
