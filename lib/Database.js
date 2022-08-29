const fs = require("fs");
const enums = require("../enums/files")

class Database {
    constructor(table){
        this.table = table
    }

    async read(){
        const data = await fs.promises.readFile(enums[this.table], "utf-8")
        return JSON.parse(data)
    }

    async insert(data){
        const db = await this.read(this.table)
        db.push(data)
        return await fs.promises.writeFile(enums[this.table], JSON.stringify(db), "utf-8")
    }

    async update(data, where){
        const db = await this.read(this.table)
        db.forEach((element, index) => {
            
            if(where(element)){
                Object.keys(data).forEach(v => {
                    db[index][v] = data[v]
                })
            }
        });
        
        return await fs.promises.writeFile(enums[this.table], JSON.stringify(db), "utf-8")
    }

    async delete(where){
        const db = await this.read(this.table)

        db.forEach((element, index) => {
            if(where(element)){
                db.splice(index, 1)
            }
        });

        return await fs.promises.writeFile(enums[this.table], JSON.stringify(db), "utf-8")
    }
}

module.exports = Database;