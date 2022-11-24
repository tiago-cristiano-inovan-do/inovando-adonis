import { OptionsCrud } from "@ioc:Inovando/Decorators/Controller";
import { CrudControllerFactory } from "./CrudControllerFactory";

export default function Crud(propsDecorator: OptionsCrud) {
  return <T extends { new (...args: any[]): {} }>(classConstructor: T) => {
    //@ts-ignore
    const crudController = new CrudControllerFactory(
      classConstructor,
      propsDecorator
    );
  };
}
