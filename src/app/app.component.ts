import {Component, OnInit} from '@angular/core';
import {Schema, SchemaItem} from "./schema";
import {SchemaService} from "./schema.service";
import {Observable, Subject} from "rxjs"
import construct = Reflect.construct;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  schema = new Schema();
  schemaItems = new Schema();
  selectedSchemaItem = new SchemaItem();

  constructor(private schemaService: SchemaService) {
  }

  ngOnInit(): void {
    this.schemaService.getSchema().then(schema => {
      this.schema = schema;
      this.schemaItems = JSON.parse(JSON.stringify(this.schema));
      this.selectedSchemaItem = schema.constructors[0];
    });

  }

  selectSchemaItem(schemaItem: SchemaItem): void {
    this.selectedSchemaItem = schemaItem;
    console.log(schemaItem);
  }

  selectSchemaConstructorByPredicate(predicate: string): void {
    console.log(predicate);
    let found = this.schema.constructors.find(constructor => constructor.type == predicate);
    console.log(found);
    this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.type == predicate);
    this.schemaItems.methods = this.schema.methods.filter(method => method.type == predicate);

  }

  search(term: string): void {
    this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.predicate.match(new RegExp(term, 'i')));
    this.schemaItems.methods = this.schema.methods.filter(method => method.method.match(new RegExp(term, 'i')));
    console.log(term);
    console.log(this.schemaItems);
  }
}
