declare module "@ioc:Inovando/RepositoryDecorator" {
  interface CrudRepositoryDecoratorInterface {
    model: any;
    selectFields: Array<string>;
    event: any;
  }
  export default function CrudRepository(
    props: CrudRepositoryDecoratorInterface
  ): (constructor: Function) => void;
}
