const express = require("express")
const { WebcastPushConnection } =
require("tiktok-live-connector")

const app = express()

let queue = []

/////////////////////////////////////////////////
// TIKTOK USERNAME
/////////////////////////////////////////////////

const tiktokUsername = "ebetsha"

/////////////////////////////////////////////////
// TIKTOK CONNECT
/////////////////////////////////////////////////

const tiktokLive =
new WebcastPushConnection(
    tiktokUsername,
    {
        processInitialData: false,
        enableExtendedGiftInfo: false,
        enableWebsocketUpgrade: false
    }
)

tiktokLive.connect()

.then(state => {

    console.log(
        "CONNECTED TO TIKTOK LIVE"
    )

})

.catch(err => {

    console.log(
        "TIKTOK ERROR:",
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
// ROOT
/////////////////////////////////////////////////

app.get("/",(req,res)=>{

    res.send(
        "SERVER WORKING"
    )

})

/////////////////////////////////////////////////
// QUEUE
/////////////////////////////////////////////////

app.get("/queue",(req,res)=>{

    res.json(queue)

    queue = []

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