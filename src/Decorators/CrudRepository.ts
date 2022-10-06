import { QueryBuilder } from "../QueryBuilder";

interface CrudRepositoryDecoratorInterface {
  model: any;
  selectFields?: Array<string>;
  event: any;
}

export default function CrudRepositoryDecorator<Model>(
  props: CrudRepositoryDecoratorInterface
) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public model = props.model;
      constructor(...args: any[]) {
        super(...args);
      }

      public async index({ qs }): Promise<Model[]> {
        const page = 1;
        const perPage = 2;
        const query = QueryBuilder.build({
          model: this.model,
          qs,
        });
        console.log({ query });
        return query.paginate(page, perPage);
      }
    };
  };
}
