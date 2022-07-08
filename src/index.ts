import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

const port = + process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});