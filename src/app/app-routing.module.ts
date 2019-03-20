import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './stickular/index/index.component';
import { PageNotFoundComponent } from './stickular/page-not-found/page-not-found.component';
import { StickerDetailComponent } from './stickular/sticker-detail/sticker-detail.component';

const routes: Routes = [
  {
    path: 'sticker-detail/:iconName/:iconStyle',
    component: StickerDetailComponent
  },
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
