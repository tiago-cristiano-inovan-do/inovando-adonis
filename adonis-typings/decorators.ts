declare module "@ioc:Inovando/Crud/Decorator" {
  import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
  import { CrudRepository } from "@ioc:Inovando/CrudRepository";
  export function Crud<T extends LucidModel>(props: {
    storeProps: string[];
    updateProps: string[];
    repository: CrudRepository<T>;
    validators: {
      store: any;
      update: any;
    };
  }): (constructor: Function) => void;
}
