const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
//MIADLEWERE
app.use(express.json());
app.use(cors())


const { MongoClient,ObjectId, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@robiul.13vbdvd.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const usersInfocollection = client.db("max-collection").collection("usersInfo");
    const productsCollection = client.db("max-collection").collection("Products");
    const pixelCollection = client.db("max-collection").collection("pixel");
    const orderssCollection = client.db("max-collection").collection("Order");
    const allLogoCollection = client.db("max-collection").collection("logoInfoo");
    const allLinksCollection = client.db("max-collection").collection("linkInfoo");
    const allAddressCollection = client.db("max-collection").collection("addressInfoo");
    const allBannerCollection = client.db("max-collection").collection("bannerInfoo");
    const allNumberCollection = client.db("max-collection").collection("numberInfoo");
    const feedbackCollection=client.db('max-collection').collection('feedbacks')
    const categoryCollection=client.db('max-collection').collection('category')
    const socialLinksCollection = client.db("max-collection").collection("socialLink");




app.get("/users", async (req, res) => {
  const result = await usersInfocollection.find().toArray();
  res.send(result);
});
  
  
    app.patch("/banners", async (req, res) => {
      // const email = req.params.email;
      // const filter = { email: email };
      const body = req.body;
      const updatedoc = {
        $set: {
          photo: body.photo,
          date: body.date,
        
        },
      };
      try {
        const result = await allBannerCollection.updateOne(filter, updatedoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating banner");
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("hello canteen");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


