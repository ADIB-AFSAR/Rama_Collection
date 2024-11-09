const express = require("express");
const app = express();
const adminRoute = require("./route/admin/admin.route");
const frontRoutes = require("./route/front/front.route");
const wishlistRoutes =  require('./route/front/wishlist.route')
const cors = require("cors");
const path = require("path");
 require("dotenv").config(); 

const mongoose = require("mongoose");

app.use(cors(
  {
      origin: ["https://rama-collection-frontend.vercel.app"],
      methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
      credentials: true
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public")));
mongoose
  .connect(process.env.MONGO_URL)
  .then((response) => {
    console.log("connected to mongodb atlas");
  })
  .catch((error) => {
    console.log("databse connection failed :" + error);
  });
app.use('/api/wishlist', wishlistRoutes)
app.use("/api/admin", adminRoute);
app.use("/api", frontRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, function () {
  console.log("server is running on port " + PORT + "and key :" + process.env.STRIPE_SECRET_KEY);
});
