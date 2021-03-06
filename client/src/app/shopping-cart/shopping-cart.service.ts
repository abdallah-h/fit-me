import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart, ICart, ICartItem, ICartTotals } from '../shared/models/cart';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  baseUrl = environment.apiUrl;
  private cartSub = new BehaviorSubject<ICart>(null);
  cart$ = this.cartSub.asObservable();
  private cartTotalSub = new BehaviorSubject<ICartTotals>(null);
  cartTotal$ = this.cartTotalSub.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) {}

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  getCart(id: string) {
    return this.http.get(this.baseUrl + 'cart?id=' + id).pipe(
      map((cart: ICart) => {
        this.cartSub.next(cart);
        this.calculateTotals();
      })
    );
  }

  setCart(cart: ICart) {
    return this.http.post(this.baseUrl + 'cart', cart).subscribe(
      (response: ICart) => {
        console.log(response);

        this.cartSub.next(response);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentCartValue() {
    return this.cartSub.value;
  }

  addItemToCart(item: IProduct, quantity = 1) {
    console.log(item);
    const itemToAdd: ICartItem = this.mapProductItemToCartItem(item, quantity);
    console.log(itemToAdd);

    const cart = this.getCurrentCartValue() ?? this.createCart();

    cart.items = this.addOrUpdateItem(cart.items, itemToAdd, quantity);
    this.setCart(cart);
  }

  incrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex((x) => x.id === item.id);
    cart.items[foundItemIndex].quantity++;
    this.setCart(cart);
  }

  decrementItemQuantity(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    const foundItemIndex = cart.items.findIndex((x) => x.id === item.id);
    if (cart.items[foundItemIndex].quantity > 1) {
      cart.items[foundItemIndex].quantity--;
      this.setCart(cart);
    } else {
      this.removeItemFromCart(item);
    }
  }

  removeItemFromCart(item: ICartItem) {
    const cart = this.getCurrentCartValue();
    if (cart.items.some((x) => x.id === item.id)) {
      cart.items = cart.items.filter((i) => i.id !== item.id);
      if (cart.items.length > 0) {
        this.setCart(cart);
      } else {
        this.deleteCart(cart);
      }
    }
  }

  deleteCart(Cart: ICart) {
    return this.http.delete(this.baseUrl + 'Cart?id=' + Cart.id).subscribe(
      () => {
        this.cartSub.next(null);
        this.cartTotalSub.next(null);
        localStorage.removeItem('Cart_id');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteLocalCart(id: string) {
    this.cartSub.next(null);
    this.cartTotalSub.next(null);
    localStorage.removeItem('cart_id');
  }

  private calculateTotals() {
    const cart = this.getCurrentCartValue();
    const shipping = this.shipping;
    const subtotal = cart.items.reduce(
      (accTotal, item) => item.price * item.quantity + accTotal,
      0
    );
    const total = subtotal + shipping;
    this.cartTotalSub.next({ shipping, total, subtotal });
  }

  private addOrUpdateItem(
    items: ICartItem[],
    itemToAdd: ICartItem,
    quantity: number
  ): ICartItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private createCart(): ICart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }

  private mapProductItemToCartItem(
    item: IProduct,
    quantity: number
  ): ICartItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
