declare module "@ioc:Inovando/ReadRepository" {
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  export default interface ReadRepository<Model> {
    index(ctx: HttpContextContract): Promise<any[]>;
    show(id: Partial<Model>): Promise<any>;
  }
}
