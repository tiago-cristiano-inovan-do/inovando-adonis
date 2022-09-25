import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class InovandoProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public async ready() {
    try {
      const { CrudController } = await import(
        "../src/Controllers/CrudController"
      );
      const CrudControllerDecorator = await import(
        "../src/Decorators/CrudController"
      );

      const { CrudRepository } = await import(
        "../src/Repositories/CrudRepository"
      );

      const { default: CrudRepositoryDecorator } = await import(
        "../src/Decorators/CrudRepository"
      );

      this.app.container.bind("Inovando/Controller", () => {
        return CrudController;
      });

      this.app.container.bind("Inovando/CrudRepository", () => {
        return CrudRepository;
      });

      this.app.container.bind("Inovando/Crud/Decorator/Controller", () => {
        console.log(
          "%cInovandoProvider.ts line:34 Object",
          "color: white; background-color: #007acc;",
          CrudControllerDecorator
        );
        return CrudControllerDecorator;
      });

      this.app.container.bind("Inovando/RepositoryDecorator", () => {
        return CrudRepositoryDecorator;
      });
    } catch (error) {
      console.log("error on bindgs");
      console.log(error);
    }
  }
}
