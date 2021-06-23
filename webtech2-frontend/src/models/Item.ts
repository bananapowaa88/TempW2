export class Item {
    name: string;
    _id: string;
    createdAt!: Date | null
    updatedAt!: Date | null


    constructor(protected item: Item) {
        this.name = item.name;
        this._id = item._id;
    }
}