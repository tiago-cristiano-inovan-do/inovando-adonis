import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import {
  IndexReturnInterface,
  CrudControllerInterface,
  OptionsCrud,
} from "@ioc:Inovando/Decorators/Controller";

export default function CrudControllerOld<Model>(propsDecorator: OptionsCrud) {
  return <T extends { new (...args: any[]): {} }>(classConstructor: T) => {
    return class
      extends classConstructor
      implements CrudControllerInterface<Model>
    {
      public options: OptionsCrud = propsDecorator;
      public errorsRequest: any;
      constructor(...args: any[]) {
        super(...args);
      }

      public async index(
        ctx: HttpContextContract
      ): Promise<IndexReturnInterface<Model>> {
        const { transform } = ctx;
        const qs = ctx.request.qs();
        const list = await this.options.repository.index({ qs });
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
            .collection(rest, this.options.transformer),
        };
      }

      public async show(ctx: HttpContextContract) {
        const { id } = ctx.params;
        const showItem = await this.options.repository.show(id);
        return ctx.transform.item(showItem, this.options.transformer);
      }

      public async save(
        ctx: HttpContextContract,
        method,
        statusReturn,
        body: any
      ) {
        const validRequest = await ctx.request.validate(
          this.options.validators[method]
        );
        if (!validRequest) {
          return ctx.response.badRequest(this.errorsRequest);
        }
        const newObject = await this.options.repository[method](body);
        return ctx.response.status(statusReturn).json(newObject);
      }

      public async store(ctx: HttpContextContract) {
        const body = ctx.request.only(this.options.storeProps);
        return this.save(ctx, "store", 201, body);
      }
    };
  };
}
