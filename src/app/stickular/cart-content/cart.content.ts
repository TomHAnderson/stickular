import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService, BaseCartItem, CheckoutPaypalSettings, CartItem } from 'ng-shopping-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.content.html',
  styleUrls: ['./cart.content.css']
})
// tslint:disable-next-line:component-class-suffix
export class CartContent {
  public items: Array<CartItem>;
  public item: CartItem;

  constructor(
    public activeModal: NgbActiveModal,
    public cartService: CartService<BaseCartItem>
  ) {
    this.items = this.cartService.getItems();

//    this.cartService.onItemsChanged.subscribe( cart => {
//      this.items = cart.getItems();
//    });
  }

  parseInt(value: string) {
    return parseInt(value, 10);
  }



}
