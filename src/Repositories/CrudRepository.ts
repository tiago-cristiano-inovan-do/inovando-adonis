import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ReadRepository from "./ReadRepository";
import WriteRepository from "./WriteRepository";
interface RepositoryOption {
  model: LucidModel;
}

abstract class CrudRepository
  implements ReadRepository, WriteRepository {
  protected model;
  protected errosRequest;

  constructor({ model }: RepositoryOption) {
    this.model = model;
  }

  destroy(id: string): void {
    console.log(`removing ${id}`);
    throw new Error("Method not implemented.");
  }

  public async index(ctx: HttpContextContract): Promise<[]> {
    const page = ctx.request.input("page", 1);
    const perPage = ctx.request.input("perPage", 10);
    return this.model.filter(ctx.request.qs()).paginate(page, perPage);
  }

  public async store({ fillableData, ctx }) {
    const newModel = new this.model();
    newModel.fill(fillableData);
    const createdModel = await newModel.save();
    await this.afterSave({ model: createdModel, fillableData, ctx });
    return createdModel;
  }

  public async update(ctx: HttpContextContract) {
    console.log(ctx);
    const newModel = new this.model();
    const createdModel = await newModel.save();
    return createdModel;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    return this.model.findOrFail(id);
  }

  public async afterSave(params) {
    return params;
  }
}
export { CrudRepository }
