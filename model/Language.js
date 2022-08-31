const Database = require("../lib/Database");

class Language{
    #language; //model

    constructor(){
        this.#language = new Database("lang");
    }

    async get(key = null){
        const lang = await this.#language.read()
        return key ? lang[key] : lang
    }
}

module.exports = new Language;