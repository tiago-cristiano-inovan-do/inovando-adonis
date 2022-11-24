declare module "@ioc:Inovando/Decorators/Controller" {
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  import { TransformerAbstract } from "@ioc:Adonis/Addons/Bumblebee";
  import { CrudRepositoryInterface } from "@ioc:Inovando/Decorators/Repository";

  export interface Pagination {
    page: number;
    firstPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  }

  export interface IndexReturnInterface<Model> {
    pagination: Pagination;
    data: Model[];
  }

  export interface OptionsCrud {
    storeProps: Array<string>;
    updateProps: Array<string>;
    repository: Required<CrudRepositoryInterface<any>>;
    validators?: any;
    transformer?: typeof TransformerAbstract;
  }

  export interface CrudControllerInterface<T> {
    options: OptionsCrud;
    index?(ctx: HttpContextContract): Promise<IndexReturnInterface<T>>;
    show?(ctx: HttpContextContract): Promise<T>;
    create?(ctx: HttpContextContract): Promise<T>;
    bulkCreate?(ctx: HttpContextContract): Promise<T>;
    update?(ctx: HttpContextContract): Promise<T[]>;
    bulkUpdate?(ctx: HttpContextContract): Promise<T[]>;
    delete?(ctx: HttpContextContract): Promise<T>;
    bulckdelete?(ctx: HttpContextContract): Promise<T>;
  }

  export interface CrudControllerFactory {
    target: any;
    options: OptionsCrud;
    constructor(target: any, options: OptionsCrud);
    index(ctx: HttpContextContract): Promise<void>;
  }
}
