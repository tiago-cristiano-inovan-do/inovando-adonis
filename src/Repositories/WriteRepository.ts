import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default interface WriteRepository {
  store({ fillableData: [] }): Promise<any>;
  update(ctx: HttpContextContract): Promise<any>;
  destroy(id: string | number): void;
}
