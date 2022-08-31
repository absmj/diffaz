const express = require("express")
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("./router/users") 
const {Response} = require("./utils/App")

app.use("/", router)

const jsonBody = bodyParser.json();

router.route('/').get(async (req, res) => {
    try{
        Response(res, await require("./router/index").index(), "Database file loaded", 200)
    }
    catch(e){
        Response(res, [], `Error occured: ${e.message}`, 500)
    }
})

router.route("/login").post(jsonBody, async (req, res) => {
    const {username, password} = req.body;
    try{
        const auth = await user.login(username, password)
        if(auth.length == 0){
            return Response(res, [], "User not founded! Maybe, username and-or password is incorrect!")
        }

        return Response(res, auth, "User Founded", 200)
    }
    catch(e){
        return Response(res, [], `Error occured: ${e.message}`, 500)
    }
})

router.route("/register").post(jsonBody, async (req, res) => {
    const data = req.body;
    try{
        await user.register(data)
        return Response(res, data, "User Created!", 200)
    }
    catch(e){
        return Response(res, [], `Error occured: ${e.message}`, 500)
    }
})

router.route("/update/:id").post(jsonBody, async (req, res) => {
    const data = req.body;
    try{
        await user.update(data, req.params.id)
        return Response(res, data, "User Updated!", 200)
    }
    catch(e){
        return Response(res, [], `Error occured: ${e.message}`, 500)
    }
})

app.listen(8000, () => console.log("Server running"))