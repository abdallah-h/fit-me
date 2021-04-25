import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem, ICartTotals } from '../shared/models/cart';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ICart>;
  cartTotal$: Observable<ICartTotals>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$;
    this.cartTotal$ = this.shoppingCartService.cartTotal$;
  }

  removeCartItem(item: ICartItem) {
    this.shoppingCartService.removeItemFromCart(item);
  }

  incrementItemQuantity(item: ICartItem) {
    this.shoppingCartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.shoppingCartService.decrementItemQuantity(item);
  }
}
