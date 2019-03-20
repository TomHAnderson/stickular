import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as iconModule from '../../data/fontawesome-free-5.7.2-desktop/metadata/icons.json';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sticker-detail',
  templateUrl: './sticker-detail.component.html',
  styleUrls: ['./sticker-detail.component.css']
})
export class StickerDetailComponent implements OnInit {
  public stickerSettings: any;
  public icons = iconModule;


  constructor(
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    this.route.queryParams.subscribe(query => {
      this.route.params.subscribe(params => {

        this.stickerSettings = {
          iconName: params['iconName'],
          iconStyle: params['iconStyle'],
          color: query['color'],
          backgroundColor: query['backgroundColor'],
          inverse: (query['invers'] === 'true') ? true : false
        };
      });
    });
  }

  addToCart(icon, border) {

  }


  ngOnInit() {
  }

  calculateTopOffset(icon) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height < width) {
      const delta = ((((width / height) * 100) - 100)) * 2;
      return (88 + delta) + 'px';
    }

    return '88px';
  }

  calculateLeftOffset(icon) {
    const width = icon.svg[this.stickerSettings.iconStyle].width;
    const height = icon.svg[this.stickerSettings.iconStyle].height;

    if (height > width) {
      const delta = ((((height / width) * 70) - 70) / 2);

      return (70 + delta) + 'px';
    } else if (width > height) {
      const delta = ((((width / height) * 70) - 70) / 2);

      return (70 + delta) + 'px';
    }

    return '75px';
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
