import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '@app/_models';
import { Cart, CartItem } from 'src/app/_models/cart.model';
import { CartService } from 'src/app/_services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent  {
  user?: User | null;
  isAdmin?: boolean = false;

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(
    private AuthenticationService: AuthenticationService,
    private cartService: CartService
  ){
    this.AuthenticationService.user.subscribe(x => {
      this.user = x;
      if (this.user?.role === 'admin'){
        this.isAdmin = true;
      }
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  logout() {
      this.AuthenticationService.logout();
      this.isAdmin = false;
  }
}
