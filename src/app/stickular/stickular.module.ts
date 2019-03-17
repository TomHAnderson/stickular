import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    IndexComponent,
    PageNotFoundComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class StickularModule { }
