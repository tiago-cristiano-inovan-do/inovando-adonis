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
    constructor.prototype.show = async (id) => {
      const item = await constructor.prototype.getActiveRecord(id);
      console.log(item);
      return item;
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
    constructor.prototype.update = async ({ id, body }) => {
      const item = await this.getActiveRecord(id);
      item.merge(body);
      await item.save();
      await constructor.prototype.event.emit(
        `update:${constructor.prototype.model.name}`,
        item
      );
      return item;
    };
    constructor.prototype.getActiveRecord = async (id) => {
      const status = true;
      const query = constructor.prototype.model.query();
      const item = await query.where("id", id).where("status", status).first();
      if (!item) {
        throw new Error("Item not found");
      }
    };
  };
}
