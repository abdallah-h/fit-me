import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from 'src/app/shared/models/cart';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  cart$: Observable<ICart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$;
  }
}
