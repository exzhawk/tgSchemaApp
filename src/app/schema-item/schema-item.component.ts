import {Component,  Input, OnInit} from '@angular/core';
import {SchemaItem} from "../schema";
import {ActivatedRoute, Params} from "@angular/router";
import {SchemaService} from "../schema.service";
import 'rxjs/add/operator/switchMap'
import {SearchService} from "../search.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-schema-item',
  templateUrl: './schema-item.component.html',
  styleUrls: ['./schema-item.component.scss']
})
export class SchemaItemComponent implements OnInit {
  @Input() selectedSchemaItem: SchemaItem;


  constructor(private route: ActivatedRoute,
              private schemaService: SchemaService,
              private searchService: SearchService,) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.schemaService.getSchemaItemByName(params['name']))
      .subscribe(schemaItem => this.selectedSchemaItem = schemaItem)
  }

  selectSchemaConstructorByType(type: string, asType: string): void {
    console.log(AppComponent.cleanType(type));
    this.searchService.emitChange(asType + ':' + AppComponent.cleanType(type));
  }


}
