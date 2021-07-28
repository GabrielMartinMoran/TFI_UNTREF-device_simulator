export class User {

    _username = null;
    _email = null;

    constructor(username, email) {
        this._username = username;
        this._email = email;
    }

    getUsername() {
        return this._username;
    }

    getEmail() {
        return this._email;
    }
}