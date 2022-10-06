declare module "@ioc:Inovando/Decorators/Controller" {
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  import { TransformerAbstract } from "@ioc:Adonis/Addons/Bumblebee";

  interface CrudControllerDecoratorInterface {
    storeProps: Array<string>;
    updateProps: Array<string>;
    repository: any;
    validators?: any;
    transformer?: typeof TransformerAbstract;
  }
  export default function CrudController(
    props: CrudControllerDecoratorInterface
  ): <T extends new (...args: any[]) => {}>(
    classConstructor: T
  ) => {
    new (...args: any[]): {
      storeProps: string[];
      updateProps: string[];
      repository: any;
      validators: any;
      transformer: any;
      errorsRequest: any;
      index(ctx: HttpContextContract): Promise<{
        pagination: {
          page: any;
          firstPage: any;
          lastPage: any;
          perPage: any;
          total: any;
        };
        data: any;
      }>;
      show(ctx: HttpContextContract): Promise<any>;
      save(
        ctx: HttpContextContract,
        method: any,
        statusReturn: any,
        body: any
      ): Promise<void>;
      store(ctx: HttpContextContract): Promise<void>;
      update(ctx: HttpContextContract): Promise<void>;
    };
  } & T;
}
