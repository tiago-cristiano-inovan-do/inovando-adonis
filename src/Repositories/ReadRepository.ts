import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default interface ReadRepository {
  index(ctx: HttpContextContract): Promise<any>;
  show(ctx: HttpContextContract): Promise<any>;
}
