declare module '@ioc:Inovando/CrudRepository' {
    import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"

    export interface InovandoRepositoryInterface {
        new(): {
            index(ctx: HttpContextContract): Promise<[]>
        }
    }
    const CrudRepository: any;
    export default CrudRepository;
}
