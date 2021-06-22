export class Item {
    name: String
    _id: String;

    constructor(private item: Item) {
        this.name = item.name;
        this._id = item._id;
    }
}