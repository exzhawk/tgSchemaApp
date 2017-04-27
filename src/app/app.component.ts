import {Component, OnInit} from '@angular/core';
import {Schema, SchemaItem} from "./schema";
import {SchemaService} from "./schema.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  schema: Schema = new Schema();
  selectedSchemaItem: SchemaItem = new SchemaItem();

  constructor(private schemaService: SchemaService) {
  }

  ngOnInit(): void {
    this.schemaService.getSchema().then(schema => {
      this.schema = schema;
      this.selectedSchemaItem = schema.constructors[0];
    });
  }

  selectSchemaItem(schemaItem: SchemaItem): void {
    this.selectedSchemaItem = schemaItem
  }
}
