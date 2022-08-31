module.exports = {
    index: async () => {
        return {
            language: await require("../model/Language").get(),
            menu: await require("../model/menu").get()
        };
    },
}