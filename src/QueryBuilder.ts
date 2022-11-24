import { Operatos } from "./QueryOperators";
import { LucidModel } from "@ioc:Adonis/Lucid/Orm";

interface QueryBuild {
  model: LucidModel;
  qs: any;
}

export class QueryBuilder {
  static build({ model, qs }: QueryBuild) {
    const modelQuery: LucidModel = model;
    const query = modelQuery.query();

    for (const key in qs) {
      let value = qs[key];
      let [param, operator = "="] = key.split(".");
      console.log({ value, operator, param });
      Operatos[operator]({ query, param, value });
    }

    return query;
  }
}
