import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
import { CrudRepository } from "../Repositories/CrudRepository";
import CrudControllerInterface from "./CrudControllerInterface";
import { ResponseDTO } from "./DTOs";

class CrudController<Model extends LucidModel>
  implements CrudControllerInterface<Model>
{
  protected errorsRequest;
  protected transformer;
  protected repository: CrudRepository<Model>;
  protected fillableProps: string[];
  protected validators = {
    store: {
      validatorClass: null,
    },
  };

  public async index(ctx: HttpContextContract): Promise<ResponseDTO<Model>> {
    const { transform } = ctx;
    const list: any = await this.repository.index(ctx);
    const { currentPage, firstPage, lastPage, perPage, total, ...data } = list;

    const pagination = {
      page: currentPage,
      firstPage,
      lastPage,
      perPage,
      total,
    };

    return {
      pagination,
      data: await transform.withContext(ctx).collection(data, this.transformer),
    };
  }

  public async store(ctx: HttpContextContract) {
    return this.save(ctx, "store", 201);
  }

  public async update(ctx: HttpContextContract) {
    return this.save(ctx, "update", 200);
  }

  private async save(ctx: HttpContextContract, method, statusReturn) {
    const validRequest = await ctx.request.validate(
      this.validators[method].validatorClass
    );
    if (!validRequest) {
      return ctx.response.badRequest(this.errorsRequest);
    }
    const fillableData = ctx.request.only(this.fillableProps);
    const newObject = await this.repository[method]({ fillableData, ctx });
    return ctx.response.status(statusReturn).json(newObject);
  }

  public async show(ctx: HttpContextContract) {
    //const showItem = await this.repository.show({ id: ctx.params.id });
    //await ctx.bouncer.with('FilePolicy').authorize('view', showItem)
    return ctx.transform.item(ctx, this.transformer);
  }

  public async destroy(ctx: HttpContextContract) {
    return this.repository.destroy(ctx.params.id);
  }
}

export { CrudController };
