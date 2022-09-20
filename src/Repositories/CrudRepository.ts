import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ReadRepository from "./ReadRepository";
import WriteRepository from "./WriteRepository";

interface BaseRepository<Model>
  extends ReadRepository<Model>,
    WriteRepository<Model> {}

abstract class CrudRepository<Model extends LucidModel>
  implements BaseRepository<Model>
{
  protected model: Model;
  protected errosRequest;

  public async index(ctx: HttpContextContract): Promise<[Model]> {
    const page = ctx.request.input("page", 1);
    const perPage = ctx.request.input("perPage", 10);
    return this.model.filter(ctx.request.qs()).paginate(page, perPage);
  }

  public async show(id: Partial<Model>): Promise<any> {
    const query = this.model.query();
    query.where({ id }).where({ status: true });
    const item = await query.first();
    return item;
  }

  public async store({ fillableData: [] }): Promise<Model> {
    throw new Error("Method not implemented.");
  }

  update(ctx: HttpContextContract): Promise<Model> {
    console.log(ctx);
    throw new Error("Method not implemented.");
  }

  destroy(id: string | number): void {
    console.log("Deleting", id);
    throw new Error("Method not implemented.");
  }

  public async afterSave(params) {
    return params;
  }
}
export { CrudRepository };
