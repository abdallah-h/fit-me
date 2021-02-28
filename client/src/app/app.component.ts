import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Fit Me';

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    const cartId = localStorage.getItem('basket_id');
    if (cartId) {
      this.shoppingCartService.getCart(cartId).subscribe(
        () => {
          console.log('Initialised cart');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
