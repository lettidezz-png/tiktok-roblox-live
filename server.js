const express = require("express")

const app = express()

/////////////////////////////////////////////////
// STORAGE
/////////////////////////////////////////////////

let queue = []

/////////////////////////////////////////////////
// ROOT
/////////////////////////////////////////////////

app.get("/", (req, res) => {

    res.send("SERVER WORKING")

})

/////////////////////////////////////////////////
// ADD USERNAME
/////////////////////////////////////////////////

app.get("/username", (req, res) => {

    const username =
        req.query.username

    console.log(
        "USERNAME:",
        username
    )

    if (
        username &&
        username !== "undefined"
    ) {

        queue.push(username)

        console.log(
            "QUEUE:",
            queue
        )
    }

    res.send("ok")

})

/////////////////////////////////////////////////
// GET QUEUE
/////////////////////////////////////////////////

app.get("/queue", (req, res) => {

    console.log(
        "QUEUE SENT:",
        queue
    )

    res.json(queue)

    queue = []

})

/////////////////////////////////////////////////
// START SERVER
/////////////////////////////////////////////////

const PORT =
process.env.PORT || 3000

app.listen(PORT, () => {

    console.log(
        "SERVER STARTED"
    )

})