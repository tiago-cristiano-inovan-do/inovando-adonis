import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
import { CrudRepository } from "../Repositories/CrudRepository";

export default function Crud<T extends LucidModel>(props: {
  storeProps: string[];
  updateProps: string[];
  repository: CrudRepository<T>;
  validators: {
    store: any;
    update: any;
  };
}) {
  return function (constructor: Function) {
    constructor.prototype.storeProps = props.storeProps;
    constructor.prototype.updateProps = props.updateProps;
    constructor.prototype.repository = props.repository;
    constructor.prototype.validators = props.validators;
  };
}
