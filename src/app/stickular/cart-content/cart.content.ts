import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.content.html',
  styleUrls: ['./cart.content.css']
})
// tslint:disable-next-line:component-class-suffix
export class CartContent {

  constructor(
    public activeModal: NgbActiveModal,
  ) {

//    this.cartService.onItemsChanged.subscribe( cart => {
//      this.items = cart.getItems();
//    });
  }

  parseInt(value: string) {
    return parseInt(value, 10);
  }
}
