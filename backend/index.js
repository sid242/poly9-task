const express = require("express");
const app = express();
const connectToMongo = require("./db")
const cors = require("cors")
const dontenv = require('dotenv')
connectToMongo();
dontenv.config({ path: './.env' });

app.use(cors())
app.use(express.json());

app.use('/api', require('./routes/app'))

// app.get("/", (req, res) => {
//     console.log("Hello");
//     res.send("HI")
// })

app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on 8000");
})