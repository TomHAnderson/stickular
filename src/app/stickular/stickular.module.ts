import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StickerDetailContent } from './sticker-detail-content/sticker-detail.content';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  entryComponents: [
    StickerDetailContent,
  ],
  declarations: [
    StickerDetailContent,
    IndexComponent,
    PageNotFoundComponent,
    SafeHtmlPipe
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NgbModule,
    InfiniteScrollModule
  ]
})
export class StickularModule { }
