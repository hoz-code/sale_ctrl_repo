import express from 'express';
import path from 'path';

import { userRouters } from './routers/userRouters.js';
import { fileURLToPath } from 'url';
import { indexRouters } from './routers/indexRouters.js';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use(express.json());


app.use('/app', userRouters);
app.use('/api', indexRouters);


export { app };
