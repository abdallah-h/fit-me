import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { ICartTotals } from '../../models/cart';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent implements OnInit {
  @Input() shippingPrice: number;
  @Input() subtotal: number;
  @Input() total: number;

  constructor() {}

  ngOnInit() {}
}
