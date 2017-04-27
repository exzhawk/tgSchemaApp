import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Constructor, SchemaItem, Schema} from "./schema";

import 'rxjs/add/operator/toPromise'
@Injectable()
export class SchemaService {
  private schemaUrl = 'http://192.168.1.234/d/schema.json';

  constructor(private http: Http) {
  }

  getSchema(): Promise<Schema> {
    return this.http.get(this.schemaUrl).toPromise().then(response => response.json() as Schema)
      .catch((error: any) => console.log(error))
  }


}
