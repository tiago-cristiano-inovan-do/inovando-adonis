declare module "@ioc:Inovando/CrudRepository" {
  import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
  import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
  import WriteRepository from "@ioc:Inovando/WriteRepository";
  import ReadRepository from "@ioc:Inovando/ReadRepository";

  interface BaseRepository<Model>
    extends ReadRepository<Model>,
      WriteRepository<Model> {}
  abstract class CrudRepository<Model extends LucidModel>
    implements BaseRepository<Model>
  {
    protected model: Model;
    protected errosRequest: any;
    constructor();
    index(ctx: HttpContextContract): Promise<[Model]>;
    show(id: Partial<Model>): Promise<any>;
    store({
      fillableData: [],
    }: {
      fillableData: Iterable<any>;
    }): Promise<Model>;
    update(ctx: HttpContextContract): Promise<Model>;
    destroy(id: string | number): void;
    afterSave(params: any): Promise<any>;
  }
  export { CrudRepository };
}
