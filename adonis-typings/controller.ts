
declare module '@ioc:Inovando/Controller' {
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  import type InovandoRepositoryInterface from "@ioc:Inovando/InovandoRepositoryInterface";
  export interface InovandoControllerInterface {
    new(fillableStoreProperties: any): {
      repository: InovandoRepositoryInterface
      transformer: any
      validators: any
      index(ctx: HttpContextContract);
    }

  }
  const InovandoController: InovandoControllerInterface;
  export default InovandoController;
}

