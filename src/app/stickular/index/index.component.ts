import { Component } from '@angular/core';
import * as iconModule from '../../data/fontawesome-pro-5.8.1-desktop/metadata/icons.json';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StickerDetailContent } from '../sticker-detail-content/sticker-detail.content';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public page = 1;
  public pageSize = 36;
  public paletteColor = 'rgb(242, 72, 63)';
  public palette = [
    'rgb(242, 72, 63)', // Red
    'rgb(231, 40, 102)', // Hot Pink
    'rgb(155, 43, 174)', // Light Purple
    'rgb(103, 59, 181)', // Purple
    'rgb(63, 81, 179)', // Dark Purple
    'rgb(37, 149, 240)', // Dark Blue
    'rgb(18, 168, 241)', // Blue
    'rgb(18, 187, 210)', // Light Blue
    'rgb(12, 149, 135)', // Blue-Green
    'rgb(79, 174, 83)', // Dark Green
    'rgb(140, 194, 80)', // Green
    'rgb(205, 220, 71)', // Light Green
    'rgb(255, 235, 77)', // Yellow
    'rgb(254, 194, 45)', // Light Orange
    'rgb(254, 154, 40)', // Orange
    'rgb(253, 91, 50)', // Dark Orange
    'rgb(121, 85, 73)', // Brown
    'rgb(158, 158, 158)', // Light Gray
    'rgb(97, 125, 138)', // Gray
    'rgb(55, 64, 70)', // Dark Gray
  ];
  public color = 'rgb(242, 72, 63)'; // red
  public backgroundColor = 'white';
  public inverse = false;
  public icons: any;
  public terms = [];
  public term: string;
  public solidFilter = true;
  public regularFilter = true;
  public lightFilter = true;
  public brandFilter = true;
  public cart = [];

  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {
    Object.keys(iconModule.default).forEach(key => {
      if (key === 'font-awesome-logo-full') {
        delete iconModule.default[key];
      }
    });

    this.icons = iconModule;
    Object.keys(this.icons.default).forEach(key => {
      this.terms = this.terms.concat(this.icons.default[key].search.terms);
      this.terms.push(key);
    });

    this.terms.sort();
    this.terms = this.terms.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    this.filterChange();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term.length < 0 ? []
        : this.terms.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  selectColor(color) {
    if (! this.inverse) {
      this.color = color;
    } else {
      this.backgroundColor = color;
    }

    this.paletteColor = color;
  }

  getColor() {
    return this.paletteColor;
  }

  inverseColors() {
    this.inverse = ! this.inverse;
    const backgroundColor = this.backgroundColor;
    this.backgroundColor = this.color;
    this.color = backgroundColor;
  }

  ucFirst(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  filterChange($event?) {
    if ($event) {
      this.page = 1;
      this.search = $event.item;
    }

    const showIconCount = this.page * this.pageSize;
    let iconsShowing = 0;

    Object.keys(this.icons.default).forEach(key => {

      if (this.icons.default[key].svg['solid']) {
        this.icons.default[key].svg.solid.visible = false;
      }

      if (this.icons.default[key].svg['regular']) {
        this.icons.default[key].svg.regular.visible = false;
      }

      if (this.icons.default[key].svg['light']) {
        this.icons.default[key].svg.regular.visible = false;
      }

      if (this.icons.default[key].svg['brands']) {
        this.icons.default[key].svg.brands.visible = false;
      }

      if (this.solidFilter) {
        if (this.icons.default[key].styles.indexOf('solid') > -1) {
          if (this.icons.default[key].svg['solid']) {
            this.icons.default[key].svg.solid.visible = true;
          }
        }
      }
      if (this.regularFilter) {
        if (this.icons.default[key].styles.indexOf('regular') > -1) {
          if (this.icons.default[key].svg['regular']) {
            this.icons.default[key].svg.regular.visible = true;
          }
        }
      }
      if (this.lightFilter) {
        if (this.icons.default[key].styles.indexOf('light') > -1) {
          if (this.icons.default[key].svg['light']) {
            this.icons.default[key].svg.light.visible = true;
          }
        }
      }
      if (this.brandFilter) {
        if (this.icons.default[key].styles.indexOf('brands') > -1) {
          if (this.icons.default[key].svg['brands']) {
            this.icons.default[key].svg.brands.visible = true;
          }
        }
      }
      // Filter Search
      if (this.term) {
        // Skip if the label matches
        if (this.term !== key) {
          // Hide all icons which do not match the term
          let found = false;
          this.icons.default[key].search.terms.forEach(t => {
            if (t.toLowerCase().indexOf(this.term.toLowerCase()) > -1) {
              found = true;
            }
          });

          if (! found) {
            if (this.icons.default[key].svg.solid) {
              this.icons.default[key].svg.solid.visible = false;
            }
            if (this.icons.default[key].svg.regular) {
              this.icons.default[key].svg.regular.visible = false;
            }
            if (this.icons.default[key].svg.light) {
              this.icons.default[key].svg.light.visible = false;
            }
            if (this.icons.default[key].svg.brands) {
              this.icons.default[key].svg.brands.visible = false;
            }
          }
        }
      }

      // Pagination
      if (iconsShowing < showIconCount) {
        let currentlyShowing = false;
        if (this.icons.default[key].svg.solid
          && this.icons.default[key].svg.solid.visible) {
          currentlyShowing = true;
        }
        if (this.icons.default[key].svg.regular
          && this.icons.default[key].svg.regular.visible) {
          currentlyShowing = true;
        }
        if (this.icons.default[key].svg.light
          && this.icons.default[key].svg.light.visible) {
          currentlyShowing = true;
        }
        if (this.icons.default[key].svg.brands
          && this.icons.default[key].svg.brands.visible) {
          currentlyShowing = true;
        }

        if (currentlyShowing) {
          iconsShowing ++;
        }
      } else {
        // Hide the rest for pagination
        if (this.icons.default[key].svg.solid) {
          this.icons.default[key].svg.solid.visible = false;
        }
        if (this.icons.default[key].svg.regular) {
          this.icons.default[key].svg.regular.visible = false;
        }
        if (this.icons.default[key].svg.light) {
          this.icons.default[key].svg.light.visible = false;
        }
        if (this.icons.default[key].svg.brands) {
          this.icons.default[key].svg.brands.visible = false;
        }
      }
    }); // End key foreach
  }

  onScroll() {
    this.page ++;
    this.filterChange();
  }

  stickerDetail(iconName: string, iconStyle: string) {
    const modalRef = this.modalService.open(StickerDetailContent, { size: 'lg' });
    modalRef.componentInstance.name = 'StickerDetail';

    modalRef.componentInstance.stickerSettings = {
      iconName: iconName,
      iconStyle: iconStyle,
      color: (this.inverse) ? this.backgroundColor : this.color,
      backgroundColor: (this.inverse) ? this.color : this.backgroundColor,
      inverse: false
    };
  }
}
