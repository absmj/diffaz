const Database = require("../lib/Database");

class User{
    #user; //model

    constructor(){
        this.#user = new Database("users");
    }

    async login(username, password){
        const auth = await this.#user.read()
        return auth.filter(v => v.username == username && v.password == password)
    }

    async register(data){
        return await this.#user.insert(data)
    }

    async updateData(data, where){
        return await this.#user.update(data, where)
    }
}

module.exports = new User;