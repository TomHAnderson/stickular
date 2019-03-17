import { Component } from '@angular/core';
import * as iconModule from '../../data/fontawesome-free-5.7.2-desktop/metadata/icons.json';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  public icons;
  public terms = [];
  public term: string;
  public brandFilter = false;
  public regularFilter = false;
  public solidFilter = false;

  constructor() {
    this.icons = iconModule;
    Object.keys(this.icons.default).forEach(key => {
      this.terms = this.terms.concat(this.icons.default[key].search.terms);
      this.terms.push(key);
    });

    this.terms.sort();
    this.terms = this.terms.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => term.length < 0 ? []
        : this.terms.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  filterChange() {
    Object.keys(this.icons.default).forEach(key => {
      if (this.icons.default[key].svg['brands']) {
        this.icons.default[key].svg.brands.visible = false;
      }

      if (this.icons.default[key].svg['solid']) {
        this.icons.default[key].svg.solid.visible = false;
      }

      if (this.icons.default[key].svg['regular']) {
        this.icons.default[key].svg.regular.visible = false;
      }

      if (this.brandFilter) {
        if (this.icons.default[key].styles.indexOf('brands') > -1) {
          if (this.icons.default[key].svg['brands']) {
            this.icons.default[key].svg.brands.visible = true;
          }
        }
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
      if (this.term) {
        // Skip if the label matches
        if (this.term !== key) {
          // Hide all icons which do not match the term
          console.log(this.icons.default[key].search.terms.indexOf(this.term));
          if (this.icons.default[key].search.terms.indexOf(this.term) === -1) {
            if (this.icons.default[key].svg.regular) {
              this.icons.default[key].svg.regular.visible = false;
            }
            if (this.icons.default[key].svg.solid) {
              this.icons.default[key].svg.solid.visible = false;
            }
            if (this.icons.default[key].svg.brands) {
              this.icons.default[key].svg.brands.visible = false;
            }
          }
        }
      }
    });
  }
}
