import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './stickular/index/index.component';
import { PageNotFoundComponent } from './stickular/page-not-found/page-not-found.component';
import { FaqComponent } from './stickular/faq/faq.component';

const routes: Routes = [
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: '',
    component: IndexComponent
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
