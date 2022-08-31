const Database = require("../lib/Database");

class Menu{
    #menu; //model

    constructor(){
        this.#menu = new Database("menu");
    }

    async get(){
        const lang = await this.#menu.read()

        return lang
    }
}

module.exports = new Menu;