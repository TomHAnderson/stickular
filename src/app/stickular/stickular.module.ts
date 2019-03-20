import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StickerDetailComponent } from './sticker-detail/sticker-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    IndexComponent,
    PageNotFoundComponent,
    SafeHtmlPipe,
    StickerDetailComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class StickularModule { }
