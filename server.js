const express = require("express")
const { WebcastPushConnection } = require("tiktok-live-connector")

const app = express()

let queue = []

/////////////////////////////////////////////////
// TIKTOK USERNAME
/////////////////////////////////////////////////

const tiktokUsername = "ТВОЙ_НИК"

/////////////////////////////////////////////////
// CONNECT TO TIKTOK LIVE
/////////////////////////////////////////////////

const tiktokLive =
new WebcastPushConnection(
    tiktokUsername
)

tiktokLive.connect()

.then(() => {

    console.log(
        "CONNECTED TO TIKTOK LIVE"
    )

})

.catch(err => {

    console.log(
        "FAILED:",
        err
    )

})

/////////////////////////////////////////////////
// CHAT EVENT
/////////////////////////////////////////////////

tiktokLive.on("chat", data => {

    console.log(
        "NEW USER:",
        data.uniqueId
    )

    queue.push(data.uniqueId)

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

    res.send("SERVER WORKING")

})

/////////////////////////////////////////////////
// START SERVER
/////////////////////////////////////////////////

const PORT =
process.env.PORT || 3000

app.listen(PORT,()=>{

    console.log(
        "SERVER STARTED"
    )

})