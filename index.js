import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './dbConfig.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { authenticate } from './controller/auth.js';
import authRouter from './routes/auth.js';
import balanceRouter from './routes/balance.js';
import categoriesRouter from './routes/categories.js';
import transactionRouter from './routes/transaction.js';

connectDB();
const app = express();

//use the name of the public build folder before deploying the app, don't use env variables for this because it does not work
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth/', authRouter);
app.use('/api/balance', authenticate, balanceRouter);
app.use('/api/categories', authenticate, categoriesRouter);
app.use('/api/transactions', authenticate, transactionRouter);
app.use('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/build', 'index.html')));

// comment this before deploying
// app.listen(3001, () => {
//     console.log('http://localhost:3001/');
// });

export default app;