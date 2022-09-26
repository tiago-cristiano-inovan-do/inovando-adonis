import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

interface CrudControllerDecoratorInterface {
  storeProps: Array<string>;
  updateProps: Array<string>;
  repository: any;
  validators?: any;
  transformer?: any;
}

/**
 *  Crud Decorator abstraction
 * @param storeProps props used to store de model
 * @returns
 */
export default function CrudController(
  props: CrudControllerDecoratorInterface
) {
  return function (constructor: Function) {
    if (!props.repository) {
      throw new Error(
        "Inform the repository for de crud decorators @Crud({repository: 'YourRepository'})"
      );
    }

    constructor.prototype.storeProps = props.storeProps;
    constructor.prototype.updateProps = props.updateProps;
    constructor.prototype.repository = props.repository;
    constructor.prototype.validators = props.validators;
    constructor.prototype.transformer = props.transformer;
    constructor.prototype.index = async (ctx: HttpContextContract) => {
      const { transform } = ctx;
      const list = await constructor.prototype.repository.index(ctx);
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
          .collection(rest, constructor.prototype.transformer),
      };
    };
    constructor.prototype.show = async (ctx: HttpContextContract) => {
      const { id } = ctx.params;
      console.log("controller show", { id });
      const showItem = await constructor.prototype.repository.show(id);
      return ctx.transform.item(showItem, constructor.prototype.transformer);
    };
    constructor.prototype.save = async (
      ctx: HttpContextContract,
      method,
      statusReturn,
      body: any
    ) => {
      const validRequest = await ctx.request.validate(
        constructor.prototype.validators[method]
      );
      if (!validRequest) {
        return ctx.response.badRequest(constructor.prototype.errorsRequest);
      }

      const newObject = await constructor.prototype.repository[method](body);

      return ctx.response.status(statusReturn).json(newObject);
    };

    constructor.prototype.store = async (ctx: HttpContextContract) => {
      const body = ctx.request.only(constructor.prototype.storeProps);
      return constructor.prototype.save(ctx, "store", 201, body);
    };

    constructor.prototype.update = async (ctx: HttpContextContract) => {
      console.log("update");
      const body = ctx.request.only(constructor.prototype.updateProps);
      const { id } = ctx.params;
      return this.save(ctx, "update", 200, { body, id });
    };
  };
}
