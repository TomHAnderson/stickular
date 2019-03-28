import { Component, Input } from '@angular/core';
import * as iconModule from '../../data/icons.json';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseCartItem, CartService } from 'ng-shopping-cart';
import { Palette } from '../../data/palette';

@Component({
  selector: 'app-sticker-detail-content',
  templateUrl: './sticker-detail.content.html',
  styleUrls: ['./sticker-detail.content.css']
})
// tslint:disable-next-line:component-class-suffix
export class StickerDetailContent {
  @Input() name;
  public stickerSettings: {
    iconName: string;
    iconStyle: string;
    color: string;
    backgroundColor: string;
    inverse: boolean;
  };
  public icons = iconModule;

  constructor(
    public activeModal: NgbActiveModal,
    public palette: Palette,
    private cartService: CartService<BaseCartItem>
  ) {
  }

  getItem(shape, name) {
    return new BaseCartItem({
      id: this.palette.getColorName(this.stickerSettings.color)
        + ':'
        + this.stickerSettings.iconStyle
        + ':'
        + this.stickerSettings.iconName
        + ':'
        + shape,
      name: name + ' (' + this.palette.getColorName(this.stickerSettings.color) + ')',
      price: 5.00,
      quantity: 1,

      // Cannot set a background image to an svg
      //      image: '/assets/svgs/' + this.stickerSettings.iconStyle + '/' + this.stickerSettings.iconName + '.svg'
    });
  }

  addToCart(item) {
    this.cartService.addItem(item);
    this.activeModal.close();
    alert(item.getName() + ' added to cart');
  }

  calculateTopOffset(icon: any, withLabel?: boolean) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height < width) {
      let delta = ((((width / height) * 100) - 100)) / 2;

      if (withLabel) {
        delta -= 20;
      }

      return (80 + delta) + 'px';
    }

    if (withLabel) {
      return '60px';
    }

    return '80px';
  }

  calculateLeftOffset(icon: any, withLabel?: boolean) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height > width) {
      let delta = ((((height / width) * 64) - 64) / 2);

      if (withLabel) {
        delta += 10;
      }

      return (64 + delta) + 'px';
    } else if (width > height) {
      let delta = ((((width / height) * 64) - 64) / 2);

      if (withLabel) {
        delta += 10;
      }

      return (64 + delta) + 'px';
    }

    if (withLabel) {
      return '78px';
    }

    return '68px';
  }

  calculateWidth(icon: any, withLabel?: boolean) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height > width) {
      let delta = (width / height * 100);
      if (delta > 100) {
        delta = 90;
      }

      if (withLabel) {
        delta -= 20;
      }

      return delta + 'px';
    } else if (width > height) {
      let delta = (height / width * 100);
      if (delta > 100) {
        delta = 90;
      }

      if (withLabel) {
        delta -= 20;
      }

      return (delta) + 'px';
    }

    if (withLabel) {
      return '70px';
    }

    return '90px';
  }

  ucFirst(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
