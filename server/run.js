import express, { Router } from 'express';
import 'dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/router.js';
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT || 5000;

app.use('/', router);


app.listen(PORT, console.log(`started on ${PORT}`))