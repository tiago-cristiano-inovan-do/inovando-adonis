import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class NoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({});

  public messages = {};
}
