import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdSidenavModule, MdListModule, MdButtonModule, MdCardModule} from "@angular/material";
import {SchemaService} from "./schema.service";
import 'hammerjs'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdListModule,
    MdButtonModule,
    MdCardModule,
  ],
  providers: [SchemaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
