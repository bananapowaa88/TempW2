export class Item {
    name: string
    _id: string;

    constructor(protected item: Item) {
        this.name = item.name;
        this._id = item._id;
    }
}