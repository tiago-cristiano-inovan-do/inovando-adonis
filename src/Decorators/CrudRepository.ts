import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
interface CrudRepositoryDecoratorInterface {
  model: any;
  selectFields?: Array<string>;
  event: any;
}

export default function CrudRepository(
  props: CrudRepositoryDecoratorInterface
) {
  return function (constructor: Function) {
    if (!props.model) {
      throw new Error(
        "Inform a model for the repostory decorator @CrudRepository({model: 'YourModel'})"
      );
    }
    Reflect.set(constructor.prototype, "model.name", props.model.name);

    constructor.prototype.model = props.model;
    constructor.prototype.event = props.event;
    constructor.prototype.index = async (ctx: HttpContextContract) => {
      const selectFields = (props.selectFields ||= ["id"]);
      const page = ctx.request.input("page", 1);
      const perPage = ctx.request.input("perPage", 10);
      const { orderBy = "created_at", orderByDirection = "asc" } =
        ctx.request.all();
      return constructor.prototype.model
        .filter(ctx.request.qs())
        .select(selectFields)
        .orderBy(orderBy, orderByDirection)
        .paginate(page, perPage);
    };
    constructor.prototype.store = async (body: any) => {
      const newModel = new constructor.prototype.model();
      newModel.fill(body);
      const createdModel = await newModel.save();
      await constructor.prototype.event.emit(
        `new:${constructor.prototype.model.name}`,
        createdModel
      );
      return createdModel;
    };
  };
}
