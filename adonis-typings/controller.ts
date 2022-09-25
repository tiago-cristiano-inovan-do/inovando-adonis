declare module "@ioc:Inovando/Controller" {
  import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
  import { CrudRepository } from "@ioc:Inovando/CrudRepository";
  import CrudControllerInterface from "@ioc:Inovando/CrudControllerInterface";
  import { ResponseDTO } from "@ioc:Inovando/Dto";
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

  class CrudController<Model extends LucidModel>
    implements CrudControllerInterface<Model>
  {
    protected errorsRequest: any;
    protected transformer: any;
    protected repository: any;
    protected fillableProps: string[];
    protected validators: {
      store: {
        validatorClass: null;
      };
    };
    index(ctx: HttpContextContract): Promise<ResponseDTO<Model>>;
    store(ctx: HttpContextContract): Promise<void>;
    update(ctx: HttpContextContract): Promise<void>;
    private save;
    show(ctx: HttpContextContract): Promise<any>;
    destroy(ctx: HttpContextContract): Promise<void>;
    new();
  }
  export { CrudController };
}
