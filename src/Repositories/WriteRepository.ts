import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default interface WriteRepository<Model> {
  store({ fillableData: [] }): Promise<Model>;
  update(ctx: HttpContextContract): Promise<Model>;
  destroy(id: string | number): void;
}
