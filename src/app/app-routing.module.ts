import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SchemaItemComponent} from "./schema-item/schema-item.component";
const routes: Routes = [
  {path: 'detail/:name', component: SchemaItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
