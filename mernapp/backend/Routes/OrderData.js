const express = require("express");
const Router = express.Router();
const Order = require("../models/Orders");

Router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let emailId = await Order.findOne({ 'email': req.body.email })    
    console.log(emailId)
    if (emailId === null) {
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
         
            res.send("Server Error", error.message)
        }
    }
})


Router.post('/myOrderData', async (req, res) => {
try {
    let myData = await Order.findOne({'email': req.body.email})
    res.json({orderData: myData})
} catch (error) {
    res.send("Server Error", error.message)
}
})

module.exports = Router;