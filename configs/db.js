// const mongoose=require("mongoose")
require('dotenv').config()

// mongoose.set('strictQuery', false)
// const connect=mongoose.connect(process.env.mongoUrl)


// module.exports={connect}

const mongoose = require('mongoose');

// const dbURI = 'your_mongodb_uri_here'; // Replace with your actual MongoDB URI

mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
