import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BaseTransformer from "../Transformers/BaseTranformer";
import NoValidator from "../Validators/NoValidator";

interface CrudControllerDecoratorInterface {
  storeProps: Array<string>;
  updateProps: Array<string>;
  repository: any;
  validators?: any;
  transformer?: any;
}

const defaultValidators = {
  store: NoValidator,
  update: NoValidator,
};

export default function CrudController(
  props: CrudControllerDecoratorInterface
) {
  return <T extends { new (...args: any[]): {} }>(classConstructor: T) => {
    return class extends classConstructor {
      public storeProps = props.storeProps;
      public updateProps = props.updateProps;
      public repository = props.repository;
      public validators = props.validators || defaultValidators;
      public transformer = props.transformer;
      public errorsRequest: any;
      constructor(...args: any[]) {
        super(...args);
      }
      public async index(ctx: HttpContextContract) {
        const { transform } = ctx;
        const qs = ctx.request.qs();
        const list = await this.repository.index({ qs });
        const { currentPage, firstPage, lastPage, perPage, total, ...rest } =
          list;

        const pagination = {
          page: currentPage,
          firstPage,
          lastPage,
          perPage,
          total,
        };

        return {
          pagination,
          data: await transform
            .withContext(ctx)
            .collection(rest, this.transformer),
        };
      }

      public async show(ctx: HttpContextContract) {
        const { id } = ctx.params;
        const showItem = await this.repository.show(id);
        return ctx.transform.item(showItem, this.transformer);
      }

      public async save(
        ctx: HttpContextContract,
        method,
        statusReturn,
        body: any
      ) {
        const validRequest = await ctx.request.validate(
          this.validators[method]
        );
        if (!validRequest) {
          return ctx.response.badRequest(this.errorsRequest);
        }

        const newObject = await this.repository[method](body);

        return ctx.response.status(statusReturn).json(newObject);
      }

      public async store(ctx: HttpContextContract) {
        const body = ctx.request.only(this.storeProps);
        return this.save(ctx, "store", 201, body);
      }

      public async update(ctx: HttpContextContract) {
        const body = ctx.request.only(this.updateProps);
        const { id } = ctx.params;
        return this.save(ctx, "update", 200, { body, id });
      }
    };
  };
}
