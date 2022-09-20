/**
 *
 * @param props Props that cant be used in store to create a model and update to update methods
 * @returns
 */
export default function FillableProps(props: {
  store: string[];
  update: string[];
}) {
  return function (constructor: Function) {
    constructor.prototype.fillableProps = props;
  };
}
const userEmails = ["p.shaddel@gmail.com", "test@gmail.com"];
function CheckDuplicateUser() {
  return function (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log(target, key, descriptor);
    const childFunction = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const emails = userEmails;
      console.log(args);
      throw new Error("Deu ruim camarada");
      if (emails.indexOf(args[0].email) !== -1) {
        return null;
      } else {
        return childFunction.apply(this, args);
      }
    };
    return descriptor;
  };
}

@FillableProps({ store: [], update: [] })
class Teste {
  fillableProps: any;
  constructor() {}

  @CheckDuplicateUser()
  testInde(test: string, item2: string) {
    console.log(test, { item2 });
  }
}

const teste = new Teste();
teste.testInde("açsldkjçlaskd", "xpto");
