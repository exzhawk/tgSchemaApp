import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Schema} from "./schema";

import 'rxjs/add/operator/toPromise'
@Injectable()
export class SchemaService {
  // private schemaUrl = '/assets/tl_schema_api_65.json';
  private schemaUrl = '/assets/tl_schema_api_65_with_doc.json';

  constructor(private http: Http) {
  }

  getSchema(): Promise<Schema> {
    return this.http.get(this.schemaUrl).toPromise().then(response => response.json() as Schema)
      .catch((error: any) => console.log(error))
  }


  getSchemaItemByName(name: string) {
    return this.getSchema().then(
      schema => schema.constructors.find(schemaItem => schemaItem.predicate == name) || schema.methods.find(schemaItem => schemaItem.method == name)
    )

  }
}
