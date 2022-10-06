import { Operatos } from "./QueryOperators";

export class QueryBuilder {
  static build({ model, qs }): any {
    const query = model.query();

    for (var key in qs) {
      let value = qs[key];
      let [param, operator = "="] = key.split(".");
      console.log({ value, operator, param });
      Operatos[operator]({ query, param, value });
    }

    return query;
  }
}
