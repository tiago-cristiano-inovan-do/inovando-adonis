declare module "@ioc:Inovando/Decorators/Repository" {
  interface CrudRepositoryDecoratorInterface {
    model: any;
    selectFields?: Array<string>;
    event: any;
  }
  export default function CrudRepositoryDecorator<Model>(
    props: CrudRepositoryDecoratorInterface
  ): <T extends new (...args: any[]) => {}>(
    constructor: T
  ) => {
    new (...args: any[]): {
      model: any;
      index({ qs }: { qs: any }): Promise<Model[]>;
    };
  } & T;
}
