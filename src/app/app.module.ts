import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MdSidenavModule, MdListModule, MdButtonModule, MdCardModule, MdInputModule,
  MdToolbarModule
} from "@angular/material";
import {SchemaService} from "./schema.service";
import 'hammerjs';
import {SchemaItemComponent} from './schema-item/schema-item.component'
import {AppRoutingModule} from "./app-routing.module";
import {SearchService} from "./search.service";

@NgModule({
  declarations: [
    AppComponent,
    SchemaItemComponent
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
    MdInputModule,
    MdToolbarModule,
    AppRoutingModule,
  ],
  providers: [SchemaService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
