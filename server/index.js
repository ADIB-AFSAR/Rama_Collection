const express = require("express");
const app = express();
const adminRoute = require("./route/admin/admin.route");
const frontRoutes = require("./route/front/front.route");
const wishlistRoutes =  require('./route/front/wishlist.route')
const cors = require("cors");
const path = require("path");
 require("dotenv").config(); 

const mongoose = require("mongoose");
 const { getProducts } = require("./controller/admin/product.controller");
const { getCategoryTree } = require("./controller/admin/category.controller");

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
console.log("Connecting to database...");
mongoose
  .connect(process.env.MONGO_URL)
  .then((response) => {
    console.log("connected to mongodb atlas with DB"+mongoose.connection.name);
  })
  .catch((error) => {
    console.log("databse connection failed :" + error);
  });

app.get('/api/admin/product',getProducts);
app.use('/api/wishlist', wishlistRoutes)
app.get('/api/category/tree', getCategoryTree);
app.use("/api/admin", adminRoute);
app.use("/api", frontRoutes);
app.get("/api/health", (req, res) => {
  return res.status(200).json({ ok: true, message: "API is awake" });
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, function () {
  console.log("server is running on port " + PORT);
});
