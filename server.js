const express = require("express")

const app = express()

let queue = []

/////////////////////////////////////////////////
// USERNAME WEBHOOK
/////////////////////////////////////////////////

app.get("/username",(req,res)=>{

    const username =
        req.query.username

    if(username){

        console.log(
            "NEW USER:",
            username
        )

        queue.push(username)
    }

    res.send("ok")
})

/////////////////////////////////////////////////
// QUEUE
/////////////////////////////////////////////////

app.get("/queue",(req,res)=>{

    res.json(queue)

    queue = []
})

/////////////////////////////////////////////////
// ROOT
/////////////////////////////////////////////////

app.get("/",(req,res)=>{

    res.send(
        "SERVER WORKING"
    )
})

/////////////////////////////////////////////////
// SERVER
/////////////////////////////////////////////////

const PORT =
process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(
        "SERVER STARTED"
    )
})