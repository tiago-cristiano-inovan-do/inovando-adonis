import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface CrudControllerInterface<Model> {
  index(ctx: HttpContextContract): void;
  show(ctx: HttpContextContract): Promise<Model>;
  store(ctx: HttpContextContract);
  update(ctx: HttpContextContract);
  destroy(ctx: HttpContextContract): Promise<any>;
}
