import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { OptionsCrud } from "@ioc:Inovando/Decorators/Controller";

const CrudActions = [{ key: "index", value: "index" }];

export class CrudControllerFactory {
  options: OptionsCrud;
  constructor(protected target: any, options: OptionsCrud) {
    this.options = options;
    this.targetProto["options"] = options;
    this.setMethods();
  }

  setMethods() {
    for (const action of CrudActions) {
      this.targetProto[action.key] = this[`${action.value}`];
    }
  }

  protected get targetProto(): any {
    return this.target.prototype;
  }

  async index(ctx: HttpContextContract) {
    const { transform } = ctx;
    const qs = ctx.request.qs();
    const list = await this.options.repository.index({ qs });
    const { currentPage, firstPage, lastPage, perPage, total, ...data } = list;
    const pagination = {
      page: currentPage,
      firstPage,
      lastPage,
      perPage,
      total,
    };

    if(!this.options.transformer){
      throw  new Error("Transformer not provided on class using crud decorator")
    }

    return {
      pagination,
      data: await transform
        .withContext(ctx)
        .collection(data, this.options.transformer),
    };
  }
}
