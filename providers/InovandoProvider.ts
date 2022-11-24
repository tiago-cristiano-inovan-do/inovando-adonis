import "reflect-metadata";
import { ApplicationContract } from "@ioc:Adonis/Core/Application";

export default class InovandoProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public async register() {
    try {
      const CrudControllerDecorator = await import(
        "../src/Decorators/Controller"
      );

      const { default: CrudRepositoryDecorator } = await import(
        "../src/Decorators/CrudRepository"
      );

      this.app.container.bind("Inovando/Decorators/Controller", () => {
        return CrudControllerDecorator;
      });

      this.app.container.bind("Inovando/Decorators/Repository", () => {
        return CrudRepositoryDecorator;
      });
    } catch (error) {
      console.log("error on bindgs");
      console.log(error);
    }
  }
}
