const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 5700;

app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const routes = require("./Routes/Route");
app.use("/", routes);


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
//   next();
// });


// mongoose
//   .connect('mongodb://127.0.0.1:27017/Ecommerce', {                // Specify your database name here
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

const uri = process.env.MONGODB_URI;
   
console.log("MongoDB URI loaded:", !!process.env.MONGODB_URI);

   mongoose
    .connect(uri)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
