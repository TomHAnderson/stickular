import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as iconModule from '../../data/fontawesome-free-5.7.2-desktop/metadata/icons.json';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sticker-detail-content',
  templateUrl: './sticker-detail.content.html',
  styleUrls: ['./sticker-detail.content.css']
})
// tslint:disable-next-line:component-class-suffix
export class StickerDetailContent {
  @Input() name;
  public stickerSettings: any;
  public icons = iconModule;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  addToCart(icon, border) {

  }

  calculateTopOffset(icon) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height < width) {
      const delta = ((((width / height) * 100) - 100)) / 2;
      return (80 + delta) + 'px';
    }

    return '80px';
  }

  calculateLeftOffset(icon) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height > width) {
      const delta = ((((height / width) * 64) - 64) / 2);

      return (64 + delta) + 'px';
    } else if (width > height) {
      const delta = ((((width / height) * 64) - 64) / 2);

      return (64 + delta) + 'px';
    }

    return '68px';
  }

  calculateWidth(icon) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height > width) {
      let delta = (width / height * 100);
      if (delta > 100) {
        delta = 90;
      }

      return delta + 'px';
    } else if (width > height) {
      let delta = (height / width * 100);
      if (delta > 100) {
        delta = 90;
      }

      return delta + 'px';
    }

    return '90px';
  }

  ucFirst(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
