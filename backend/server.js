import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
dotenv.config();

mongoose
  .connect('mongodb://0.0.0.0:27017/amazona')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    optionSuccessStatus: 200,
  })
);

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
