import {Component, OnInit} from '@angular/core';
import {Schema} from "./schema";
import {SchemaService} from "./schema.service";
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
  static flagsRe = new RegExp('^flags\\.\\d+\\?(.*)$');
  static vectorRe = new RegExp('^Vector<(.*)>$');
  flagsReString = (str) => new RegExp('^flags\\.\\d+\\?' + str + '$');
  vectorReString = (str) => new RegExp('^Vector<' + str + '>$');
  keyword: string = '';

  constructor(private schemaService: SchemaService,
              private searchService: SearchService) {
    searchService.changeEmitted$.subscribe(type => {
      this.keyword = type;
      this.search();
      console.log(type);
    })
  }

  ngOnInit(): void {
    this.schemaService.getSchema().then(schema => {
      this.schema = schema;
      this.schemaItems = JSON.parse(JSON.stringify(this.schema));
    });

  }


  searchByType(type: string): void {
    // type = this.cleanType(type);
    let found = this.schema.constructors.find(constructor => constructor.type == type);
    if (found) {
      this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.type == type);
      this.schemaItems.methods = this.schema.methods.filter(method => method.type == type);
    } else {
      console.log('not found');
    }
  }

  search(): void {
    // let term = this.cleanType(this.keyword);
    let term = this.keyword;
    if (term.includes(':')) {
      let [t, k] = term.split(':');
      // k = this.cleanType(k);
      switch (t) {
        case 'any':

          break;
        case 'type':
          this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.type === k);
          this.schemaItems.methods = this.schema.methods.filter(method => method.type == k);
          break;
        case'param':
          this.schemaItems.constructors = this.schema.constructors.filter(
            constructor => constructor.params.find(
              param => param.type === k || param.type.match(this.flagsReString(k)) !== null || param.type.match(this.vectorReString(k)) !== null
            )
          );
          this.schemaItems.methods = this.schema.methods.filter(
            method => method.params.find(
              param => param.type === k || param.type.match(this.flagsReString(k)) !== null || param.type.match(this.vectorReString(k)) !== null
            )
          );
          break;
      }
    } else {
      this.schemaItems.constructors = this.schema.constructors.filter(constructor => constructor.predicate.match(new RegExp(term, 'i')));
      this.schemaItems.methods = this.schema.methods.filter(method => method.method.match(new RegExp(term, 'i')));
    }
  }

  static cleanType(origType: string): string {
    if (origType.startsWith("flags.")) {
      origType = this.flagsRe.exec(origType)[1];
    }
    if (origType.startsWith("Vector<")) {
      origType = this.vectorRe.exec(origType)[1];
    }
    return origType;
  }

}
