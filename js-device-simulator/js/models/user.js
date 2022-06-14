export class User {

    _username = null;
    _email = null;
    _secret = null;

    constructor(username, email, secret) {
        this._username = username;
        this._email = email;
        this._secret = secret;
    }

    getUsername() {
        return this._username;
    }

    getEmail() {
        return this._email;
    }

    getSecret() {
        return this._secret;
    }

    static fromObject(obj) {
        const user = new User();
        Object.assign(user, obj);
        return user;
    }
}