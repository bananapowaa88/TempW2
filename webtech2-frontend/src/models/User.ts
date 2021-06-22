export class User {
    email: String;
    password: String;
    _id: String;

    constructor(private user: User) {
        this.email = user.email;
        this.password = user.password;
        this._id = user._id;
    }
}