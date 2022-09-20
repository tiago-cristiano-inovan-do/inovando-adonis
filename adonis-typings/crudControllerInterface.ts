declare module "@ioc:Inovando/CrudControllerInterface" {
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  export default interface CrudControllerInterface<Model> {
    index(ctx: HttpContextContract): void;
    show(ctx: HttpContextContract): Promise<Model>;
    store(ctx: HttpContextContract): any;
    update(ctx: HttpContextContract): any;
    destroy(ctx: HttpContextContract): Promise<any>;
  }
}
