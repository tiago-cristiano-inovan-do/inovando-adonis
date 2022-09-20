import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class InovandoProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public async register() {
    const { CrudController } = await import(
      "../src/Controllers/CrudController"
    );
    const Crud = await import("../src/Decorators/CrudController");

    const { CrudRepository } = await import(
      "../src/Repositories/CrudRepository"
    );

    this.app.container.bind("Inovando/Controller", () => {
      return CrudController;
    });

    this.app.container.bind("Inovando/CrudRepository", () => {
      return CrudRepository;
    });

    this.app.container.bind("Inovando/Crud/Decorator", () => {
      return { Crud };
    });
  }
}
