const user = require("../model/User")

module.exports = {
    login: async (username, password) => {
        const auth = await user.login(username, password)
        return auth;
    },

    register: async data => {
        return await user.register(data)
    },

    update: async (data, id, where = e => e.id == id) => {
        return await user.updateData(data, where)
    }
}