const express = require("express")
const { WebcastPushConnection } = require("tiktok-live-connector")

const app = express()

let queue = []

/////////////////////////////////////////////////
// TIKTOK USERNAME
/////////////////////////////////////////////////

const tiktokUsername = "ebetsha"

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
// READ CHAT
/////////////////////////////////////////////////

tiktokLive.on("chat", data => {

    console.log(
        "NEW USER:",
        data.uniqueId
    )

    queue.push(data.uniqueId)

})

/////////////////////////////////////////////////
// ROBLOX QUEUE
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