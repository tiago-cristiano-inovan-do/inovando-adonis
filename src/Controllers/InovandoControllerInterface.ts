import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default interface InovandoControllerInterface {
    index(ctx: HttpContextContract): void
}