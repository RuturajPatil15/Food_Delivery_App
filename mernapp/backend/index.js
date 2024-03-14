const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const mongoDB = require("./db")
const CreateUser = require("./Routes/CreateUser")
const Displaydata = require("./Routes/DisplayData")
const OrderData = require("./Routes/OrderData")


app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use(bodyParser.json())
mongoose.connect("mongodb+srv://goFood:ruturaj1234@cluster0.xjgnpez.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected")
}).catch((error)=>{
    console.log("error")
})

app.use("/api", CreateUser)
app.use("/api", Displaydata)
app.use("/api", OrderData)

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

