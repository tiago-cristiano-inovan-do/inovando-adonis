declare module "@ioc:Inovando/Decorators/Repository" {
  import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
  export interface CrudRepositoryDecoratorInterface<Model> {
    model: Model;
    selectFields?: Array<string>;
    event: any;
  }

  export interface IndexResponseInterface<Model> {
    currentPage: number;
    firstPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    items: Model[];
  }

  export interface ShowResponseInterface<Model> {
    item: Model;
  }

  export interface CrudRepositoryInterface<Model> {
    index?({ qs });
    show?({ qs }): Promise<ShowResponseInterface<Model>>;
    store?(propToUpdate: Partial<Model>): Promise<Model>;
    bulkStore?(propToUpdate: Partial<Model[]>): Promise<Model[]>;
    update?(id: string, propToUpdate: Partial<Model>): Promise<Model>;
    bulkUpdate?(itensToUpdat: Partial<Model[]>): Promise<Model[]>;
    destroy?(id: string): Promise<boolean>;
  }

  export default function Repository<Model extends LucidModel>(
    props: CrudRepositoryDecoratorInterface<Model>
  ): <T extends new (...args: any[]) => {}>(
    constructor: T
  ) => {
    new (...args: any[]): {
      model: Model;
      index({ qs }: { qs: any }): Promise<IndexResponseInterface<Model>>;
      show({ qs }: { qs: any }): Promise<ShowResponseInterface<Model>>;
      store(propsToStore: Partial<Model>): Promise<Model>;
      bulkStore(propToUpdate: (Model | undefined)[]): Promise<Model[]>;
      update(id: string, propToUpdate: Partial<Model>): Promise<Model>;
      bulkUpdate(itensToUpdat: (Model | undefined)[]): Promise<Model[]>;
      destroy(id: string): Promise<boolean>;
    };
  } & T;
}
