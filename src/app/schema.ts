export class Schema {
  constructors: Constructor[];
  methods: Method[];
}
export class SchemaItem {
  id: number;
  params: Param[];
  type: string;
}
export class Constructor extends SchemaItem {
  predicate: string;
}
export class Method extends SchemaItem {
  method: string;
}
export class Param {
  name: string;
  type: string;
}
