import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartItem } from '../shared/models/cart';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<ICart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$;
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
