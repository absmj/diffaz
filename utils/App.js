module.exports = {
    Response: (res, data, message, status = 404) => {
        return res.status(status).send({
            status,
            message,
            data
        })
    }
}