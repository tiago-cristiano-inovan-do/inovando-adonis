
declare module '@ioc:TesteRepository' {
    import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

    export interface TesteRepoInterface {
        new(): {
            index(ctx: HttpContextContract);
        }
    }
    const TesteRepository: TesteRepoInterface;
    export default TesteRepository;
}
