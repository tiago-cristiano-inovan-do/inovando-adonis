import { ApplicationContract } from '@ioc:Adonis/Core/Application'
export default class InovandoProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) { }

  public async register() {

    const { InovandoController } = await import('../src/Controllers/InovandoController')

    const { CrudRepository } = await import('../src/Repositories/CrudRepository')

    this.app.container.bind("Inovando/Controller", () => {
      return InovandoController
    });

    this.app.container.bind("Inovando/CrudRepository", () => {
      return CrudRepository
    });

  }
}
