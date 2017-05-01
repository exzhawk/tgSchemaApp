import {Component, OnInit} from '@angular/core';
import {Schema, SchemaItem} from "./schema";
import {SchemaService} from "./schema.service";
import {Observable, Subject} from "rxjs"
import construct = Reflect.construct;
import {SearchService} from "./search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  schema = new Schema();
  schemaItems = new Schema();
  flagsRe = new RegExp(/^flags\.\d+\?(.*)$/);
  vectorRe = new RegExp(/^Vector<(.*)>$/);


  constructor(private schemaService: SchemaService,
              private searchService: SearchService) {
    searchService.changeEmitted$.subscribe(
      type => {
        this.searchByType(type);
      }
    )
  }

  ngOnInit(): void {
    this.schemaService.getSchema().then(schema => {
      this.schema = schema;
      this.schemaItems = JSON.parse(JSON.stringify(this.schema));
    });

  }


  searchByType(type: string): void {
    if (type.startsWith("flags")) {
      type = this.flagsRe.exec(type)[1];
    }
    if (type.startsWith("Vector<")) {
      type = this.vectorRe.exec(type)[1];
    }
    let found = this.schema.constructors.find(constructor => constructor.type == type);
    if (found) {
      this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.type == type);
      this.schemaItems.methods = this.schema.methods.filter(method => method.type == type);
    } else {
      console.log('not found');
    }
  }

  search(term: string): void {
    this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.predicate.match(new RegExp(term, 'i')));
    this.schemaItems.methods = this.schema.methods.filter(method => method.method.match(new RegExp(term, 'i')));
    console.log(term);
    console.log(this.schemaItems);
  }

}
