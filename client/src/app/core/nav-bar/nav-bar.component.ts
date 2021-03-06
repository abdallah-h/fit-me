import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ICart } from 'src/app/shared/models/cart';
import { IUser } from 'src/app/shared/models/user';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  cart$: Observable<ICart>;
  currentUser$: Observable<IUser>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.cart$;
    this.currentUser$ = this.accountService.currentUser$;
  }
  logout() {
    this.accountService.logout();
  }
}
