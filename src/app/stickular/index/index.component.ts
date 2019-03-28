import { Component } from '@angular/core';
import * as iconModule from '../../data/icons.json';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StickerDetailContent } from '../sticker-detail-content/sticker-detail.content';
import { Palette } from '../../data/palette';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public page = 1;
  public pageSize = 36;
  public paletteColor;
  public color;
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
    private modalService: NgbModal,
    public palette: Palette
  ) {
    this.color = this.palette.color.red;
    this.paletteColor = this.palette.color.red;

    // Take this out; it doesn't fit on a triangle!
    Object.keys(iconModule.default).forEach(key => {
      if (key === 'font-awesome-logo-full') {
        delete iconModule.default[key];
      }
    });

    // Add all icon search terms to terms
    this.icons = iconModule;
    Object.keys(this.icons.default).forEach(key => {
      this.terms = this.terms.concat(this.icons.default[key].search.terms);
      this.terms.push(key);
    });

    // Lowercase all terms
    Object.keys(this.terms).forEach(index => {
      this.terms[index] = this.terms[index].toLowerCase();
    });

    // Get unique list of terms
    this.terms.sort();
    this.terms = this.terms.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    this.filterChange();
  }

  colors() {
    const colors = [];
    Object.keys(this.palette.color).forEach( color => colors.push(this.palette.color[color]));

    return colors;
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
        this.icons.default[key].svg.light.visible = false;
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
      if ($event) {
        this.term = $event.item;
      }
      
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

          if (key.toLowerCase().indexOf(this.term.toLowerCase()) > -1) {
            found = true;
          }

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
