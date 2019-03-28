import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService, BaseCartItem } from 'ng-shopping-cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.content.html',
  styleUrls: ['./cart.content.css']
})
// tslint:disable-next-line:component-class-suffix
export class CartContent {
  public settings = {
    business: 'contact@apiskeletons.com',
    itemName: 'Stickular Order',
    itemNumber: 'stickular-order',
    serviceName: 'Stickular',
    country: 'US'
  };

  constructor(
    public activeModal: NgbActiveModal,
    private cartService: CartService<BaseCartItem>
  ) {
  }



}
