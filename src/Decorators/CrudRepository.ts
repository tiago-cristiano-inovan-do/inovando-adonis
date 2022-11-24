import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
import {
  CrudRepositoryInterface,
  CrudRepositoryDecoratorInterface,
  ShowResponseInterface,
} from "@ioc:Inovando/Decorators/Repository";

import { QueryBuilder } from "../QueryBuilder";
import { instanceToPlain } from "class-transformer";

export default function CrudRepositoryDecorator<Model extends LucidModel>(
  props: CrudRepositoryDecoratorInterface<Model>
) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements CrudRepositoryInterface<Model> {
      public model: Model = props.model;
      constructor(...args: any[]) {
        super(...args);
      }

      public async index({ qs }) {
        const page = 1;
        const perPageValue = 2;
        const all = false;
        const query = QueryBuilder.build({
          model: this.model,
          qs,
        });

        if (all) {
          const allItems = await query.exec();
          return {
            currentPage: 1,
            firstPage: 1,
            lastPage: 1,
            perPage: allItems.length,
            total: allItems.length,
            items: instanceToPlain(allItems) as Model[],
          };
        }

        const allItems = await query.paginate(page, perPageValue);
        return allItems;
        //@ts-ignore
        console.log({ allItems: allItems.rows });

        return {
          currentPage: 1,
          firstPage: 1,
          lastPage: 1,
          perPage: allItems.length,
          total: allItems.length,
          items: instanceToPlain(allItems) as Model[],
        };
      }

      public async show({
        qs,
      }: {
        qs: any;
      }): Promise<ShowResponseInterface<Model>> {
        const query = QueryBuilder.build({
          model: this.model,
          qs,
        });
        const itemDb = query.exec();
        let plainItem = instanceToPlain(itemDb) as Model;
        return {
          item: plainItem,
        };
      }

      public async store(propsToStore: Partial<Model>): Promise<Model> {
        console.log(propsToStore);
        throw new Error("Method not implemented.");
      }
      public async bulkStore(
        propToUpdate: (Model | undefined)[]
      ): Promise<Model[]> {
        console.log(propToUpdate);
        throw new Error("Method not implemented.");
      }
      public async update(
        id: string,
        propToUpdate: Partial<Model>
      ): Promise<Model> {
        console.log(propToUpdate, { id });
        throw new Error("Method not implemented.");
      }
      public async bulkUpdate(
        itensToUpdat: (Model | undefined)[]
      ): Promise<Model[]> {
        console.log(itensToUpdat);
        throw new Error("Method not implemented.");
      }
      public async destroy(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
        console.log(id);
      }
    };
  };
}
