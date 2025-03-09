import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


const userRouters = express.Router();

userRouters.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','..', 'frontend', 'publics', 'index.html'));
});


export { userRouters };