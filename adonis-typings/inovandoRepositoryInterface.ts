
declare module '@ioc:Inovando/InovandoRepositoryInterface' {
    import { LucidModel } from "@ioc:Adonis/Lucid/Orm";
    import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
    export interface RepositoryOption {
        model: LucidModel;
    }
    export default interface InovandoRepositoryInterface {
        new(repositoryOption: RepositoryOption): {
            index(ctx: HttpContextContract): Promise<[]>
        }
    }
}


