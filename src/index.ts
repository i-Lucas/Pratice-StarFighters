import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import handleError from './middlewares/errorHandler.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use(handleError);

const port = + process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});