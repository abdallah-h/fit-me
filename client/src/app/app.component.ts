import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Fit Me';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe(
      () => {
        console.log('loaded user');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadCart() {
    const cartId = localStorage.getItem('cart_id');
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
