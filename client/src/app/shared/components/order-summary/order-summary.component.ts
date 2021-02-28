import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { ICartTotals } from '../../models/cart';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {
  cartTotal$: Observable<ICartTotals>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartTotal$ = this.shoppingCartService.cartTotal$;
  }
}
