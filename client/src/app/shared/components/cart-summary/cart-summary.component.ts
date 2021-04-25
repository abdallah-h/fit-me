import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from '../../models/cart';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {
  @Output() decrement: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() increment: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() remove: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Input() isCart = true;
  @Input() items: ICartItem[] | IOrderItem[] = [];
  @Input() isOrder = false;

  constructor() {}

  ngOnInit(): void {}

  decrementItemQuantity(item: ICartItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: ICartItem) {
    this.increment.emit(item);
  }

  removeCartItem(item: ICartItem) {
    this.remove.emit(item);
  }
}
