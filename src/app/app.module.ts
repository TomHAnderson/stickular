import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StickularModule } from './stickular/stickular.module';
import { DataModule } from './data/data.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickularModule,
    DataModule,
    InfiniteScrollModule,
  ],
  exports: [
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
