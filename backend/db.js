const mongoose = require('mongoose');
const dontenv = require('dotenv')
dontenv.config({ path: './.env' });

const mongoURI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
