const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5001;
// Database - MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware 
var cors = require('cors')
app.use(cors());
app.use(express.json());
// env



const uri = `mongodb+srv://${process.env.TRAVEL_DB}:${process.env.TRAVEL_PASSWORD}@cluster0.kzhxfi7.mongodb.net/?retryWrites=true&w=majority`;
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
        await client.connect();
        const propertyCollection = client.db('Properties').collection('property');
        // 
        app.get('/createproperty', async (req, res) => {
            const query = {};
            const cursor = propertyCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        //
        app.post('/createproperty', async (req, res) => {
            const addProperty = req.body;
            const result = await propertyCollection.insertOne(addProperty);
            res.send(result)
            console.log('Success', result)

        });

    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Backend connected')
});
app.post('/property', async (req, res) => {

})



app.listen(port, () => {
    console.log('Backend Worked', port)
})