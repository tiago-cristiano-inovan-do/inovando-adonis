declare module "@ioc:Inovando/Random/Item" {
    export interface ItemContract {
        new(item: string)
    }
    const Item: ItemContract
    export default Item
}