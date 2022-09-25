declare module "@ioc:Inovando/Crud/Decorator/Controller" {
  export default function Crud(props: {
    storeProps: string[];
    updateProps: string[];
    repository: any;
    validators: {
      store: any;
      update: any;
    };
    transformer: any;
  }): (constructor: Function) => void;
}
