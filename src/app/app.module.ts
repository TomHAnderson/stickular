import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StickularModule } from './stickular/stickular.module';
import { DataModule } from './data/data.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StickularModule,
    DataModule,
    InfiniteScrollModule,
    GoTopButtonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    InfiniteScrollModule,
    GoTopButtonModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
