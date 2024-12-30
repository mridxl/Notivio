import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRouter from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);

// Connect to mongoDB
connectDB();
// Only starts the server once we're connected to mongoDB
mongoose.connection.once('open', () => {
  console.log(`Connected to mongoDB`);
  app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`);
  });
});
