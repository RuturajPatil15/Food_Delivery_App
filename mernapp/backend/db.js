const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://goFood:ruturaj1234@cluster0.xjgnpez.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('gofoodmern');
    const foodItems = database.collection('food_items');
    const foodCategory = database.collection('food_category');
    
    const foodsI = await foodItems.find({}).toArray();
    const foodsC = await foodCategory.find({}).toArray();
    // console.log(foods);
    // console.log(foodsC);

    global.food_items = foodsI;
    global.food_category = foodsC;
    // console.log(global.food_items);
    // console.log(global.food_category);
    
    console.log("connected successfully")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run()
.catch(console.dir);









// const express = require("express");
// const Router = express.Router();
// const { MongoClient } = require("mongodb");



// // Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://goFood:ruturaj1234@cluster0.xjgnpez.mongodb.net/?retryWrites=true&w=majority";

// // Create a new client and connect to MongoDB
// const client = new MongoClient(uri);

// Router.post("/" ,async (req,res)=>{
//   try {
//     // Connect to the "insertDB" database and access its "haiku" collection
//     const database = client.db("gofoodmern");
//     const collection = database.collection("food_items");
    
//     // Create a document to insert
//     const doc = {
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     }
//     // Insert the defined document into the "haiku" collection
//     const result = await collection.insertOne(doc);

//     // Print the ID of the inserted document
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     res.status(200).json({awesome: "yes"})
//   } catch(error){
//     throw error;
//   } finally {
//      // Close the MongoDB client connection
//     await client.close();
//     console.log("all is done")
//   }
// })

// module.exports = Router;



// const url = "mongodb://localhost:27017";
// const Client = new MongoClient(url);

// MongoClient.connect(url, { useNewUrlParser : true}) 
// .then(async ()=>{
//   const database = Client.db('gofoodmern');
//     const collection = database.collection('food_items');
    
//     const foods = await collection.find({}).toArray();
//     console.log(foods);
    
//     console.log("connected successfully")
    
//   })
//   .catch((error)=>{
//     console.log("error")
// })