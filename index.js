const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
//MIADLEWERE
app.use(express.json());
app.use(cors())


const { MongoClient, ServerApiVersion } = require('mongodb');
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
    const productsCollection = client.db("Shokher-Bazar").collection("Products");
    const orderssCollection = client.db("Shokher-Bazar").collection("Orders");
    const UsersCollection = client.db("Shokher-Bazar").collection("usersInfoo");
    const allLogoCollection = client.db("Shokher-Bazar").collection("logoInfoo");
    const allLinksCollection = client.db("Shokher-Bazar").collection("linkInfoo");
    const allAddressCollection = client.db("Shokher-Bazar").collection("addressInfoo");

    const allBannerCollection = client.db("Shokher-Bazar").collection("bannerInfoo");
    const allNumberCollection = client.db("Shokher-Bazar").collection("numberInfoo");

    const feedbackCollection=client.db('Shokher-Bazar').collection('feedbacks')



    /////////////////////////////////////////////////////////////////////////
    //                        news info part
    ////////////////////////////////////////////////////////////////////////

    app.post("/products",  async (req, res) => {
      const data = req.body;
      const result = await productsCollection.insertOne(data);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });



    app.get('/productDetails/:id',async(req,res)=>{
      const id=req.params.id 
      const filter={ _id: new ObjectId(id)}
      const result=await productsCollection.findOne(filter)
      res.send(result)
    })


    app.get("/products/:id", async (req, res) => {
      const id=req.params.id 
      const filter={ _id: new ObjectId(id)}
      const result = await productsCollection.findOne(filter)
      res.send(result);
    });

    app.get("/news/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(filter);
      res.send(result);
    });

    app.patch("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const body = req.body;
      const updatedoc = {
        $set: {
          title: body.title,
          short: body.short,
          price: body.price,
          category: body.category,
          brand: body.brand,
          discount: body.discount,
          image: body.image,
          currentTime: body.currentTime // Include current time if needed
        },
      };
      const result = await productsCollection.updateOne(filter, updatedoc);
      res.send(result);
    });

  

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(filter);
      res.send(result);
    });

    /////////////////////////////////////////////////////////////
    app.post("/orders",  async (req, res) => {
      const data = req.body;
      const result = await orderssCollection.insertOne(data);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const result = await orderssCollection.find().toArray();
      res.send(result);
    });

    app.get("/orders/:id", async (req, res) => {
      const id=req.params.id 
      const filter={ _id: new ObjectId(id)}
      const result = await orderssCollection.findOne(filter)
      res.send(result);
    });

    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await orderssCollection.deleteOne(filter);
      res.send(result);
    });



     ///////////////////////////////////////////////////////////////////////////
    //                         user social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/users", async (req, res) => {
      const result = await allLinkCollection.find().toArray();
      res.send(result);
    });

    // app.get("/users", async (req, res) => {
    //   const result = await allLinkCollection.find().toArray();
    //   res.send(result);
    // });

    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await allLinkCollection.findOne(filter);
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const result = await allLinkCollection.findOne(filter);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const existingUser = await allLinkCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists" });
      }
      const result = await allLinkCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;
      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      const query = { email: email };
      const user = await allLinkCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await allLinkCollection.deleteOne(filter);
      res.send(result);
    });


    app.patch("/users", async (req, res) => {
      // const email = req.params.email;
      // const filter = { email: email };
      const body = req.body;
      const updatedoc = {
        $set: {
          facebookID: body.facebookID,
          instagramID: body.instagramID,
          linkedinID: body.linkedinID,
          twitterID: body.twitterID,
          youtubeID: body.youtubeID,
          whatsappID: body.whatsappID,
          date: body.date,
        },
      };
      try {
        const result = await allLinkCollection.updateOne(filter, updatedoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
      }
    });

        /////////////////////////////////////////////////////////////////////////
    //                        feedb ack info part
    ////////////////////////////////////////////////////////////////////////

    app.post("/feedbacks", async (req, res) => {
      const data = req.body;
      const result = await feedbackCollection.insertOne(data);
      res.send(result);
    });

    app.get("/feedbacks", async (req, res) => {
      const result = await feedbackCollection.find().toArray();
      res.send(result);
    });

    ///////////////////////////////////////////////////////////////////////////
    //                         logo social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/logos", async (req, res) => {
      const result = await allLogoCollection.find().toArray();
      res.send(result);
    });

    // app.get("/logos", async (req, res) => {
    //   const result = await allLogoCollection.find().toArray();
    //   res.send(result);
    // });

    app.get("/logos/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await allLogoCollection.findOne(filter);
      res.send(result);
    });

    app.get("/logos/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const result = await allLogoCollection.findOne(filter);
      res.send(result);
    });

    app.post("/logos", async (req, res) => {
      const user = req.body;
      const result = await allLogoCollection.insertOne(user);
      res.send(result);
    });

    // app.get("/logos/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   if (req.decoded.email !== email) {
    //     res.send({ admin: false });
    //   }
    //   const query = { email: email };
    //   const user = await allLogoCollection.findOne(query);
    //   const result = { admin: user?.role === "admin" };
    //   res.send(result);
    // });

    app.delete("/logos/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await allLogoCollection.deleteOne(filter);
      res.send(result);
    });


    app.patch("/logos", async (req, res) => {
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
        const result = await allLogoCollection.updateOne(filter, updatedoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
      }
    });
    ///////////////////////////////////////////////////////////////////////////
    //                         links social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/links", async (req, res) => {
      const result = await allLinksCollection.find().toArray();
      res.send(result);
    });

    app.post("/links", async (req, res) => {
      const user = req.body;
      const result = await allLinksCollection.insertOne(user);
      res.send(result);
    });
    ///////////////////////////////////////////////////////////////////////////
    //                         number social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/numbers", async (req, res) => {
      const result = await allNumberCollection.find().toArray();
      res.send(result);
    });

    app.post("/numbers", async (req, res) => {
      const user = req.body;
      const result = await allNumberCollection.insertOne(user);
      res.send(result);
    });
    ///////////////////////////////////////////////////////////////////////////
    //                         address social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/address", async (req, res) => {
      const result = await allAddressCollection.find().toArray();
      res.send(result);
    });

    app.post("/address", async (req, res) => {
      const user = req.body;
      const result = await allAddressCollection.insertOne(user);
      res.send(result);
    });


   ////////////////////////////////////////////////////////////
    //                         banner social data
    ///////////////////////////////////////////////////////////////////////////

    app.get("/banners", async (req, res) => {
      const result = await allBannerCollection.find().toArray();
      res.send(result);
    });

    // app.get("/logos", async (req, res) => {
    //   const result = await allLogoCollection.find().toArray();
    //   res.send(result);
    // });

    app.get("/banners/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { email: email };
      const result = await allBannerCollection.findOne(filter);
      res.send(result);
    });

    app.get("/banners/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const result = await allBannerCollection.findOne(filter);
      res.send(result);
    });

    app.post("/banners", async (req, res) => {
      const user = req.body;
      const result = await allBannerCollection.insertOne(user);
      res.send(result);
    });

    // app.get("/logos/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   if (req.decoded.email !== email) {
    //     res.send({ admin: false });
    //   }
    //   const query = { email: email };
    //   const user = await allLogoCollection.findOne(query);
    //   const result = { admin: user?.role === "admin" };
    //   res.send(result);
    // });

    app.delete("/banners/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await allBannerCollection.deleteOne(filter);
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


