import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import User from './models/userModel.js';
import productRoute from './routes/productRoute.js'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect('mongodb://localhost:27017/Ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: 'David',
      email: 'd_lekveishvili@cu.edu.ge',
      password: '1234',
      isAdmin: true
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

app.listen(9213, () => { console.log("Server started at http://localhost:5000") });