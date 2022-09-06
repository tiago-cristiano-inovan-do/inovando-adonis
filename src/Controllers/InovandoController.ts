import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { CrudRepository } from "../Repositories/CrudRepository";
import InovandoControllerInterface from "./InovandoControllerInterface";

class InovandoController implements InovandoControllerInterface {
  protected schemaValidator;
  private errosRequest;
  protected transformer;
  protected repository: CrudRepository;
  protected fillableStoreProperties: [];

  // constructor(fillableStoreProperties) {
  //   this.fillableStoreProperties = fillableStoreProperties
  // }

  public async index(ctx: HttpContextContract) {
    console.log("zxczxc")
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
    const validRequest = await ctx.request.validate(this.schemaValidator.store);
    if (!validRequest) {
      return ctx.response.badRequest(this.errosRequest);
    }
    const fillableData = ctx.request.only(this.fillableStoreProperties);
    const newObject = await this.repository.store({ fillableData, ctx });
    return ctx.response.status(200).json(newObject);
  }

  public async show(ctx: HttpContextContract) {
    const showItem = await this.repository.show(ctx);
    await ctx.bouncer.with("FilePolicy").authorize("view", showItem);
    return ctx.transform.item(showItem, this.transformer);
  }
}

export { InovandoController }



