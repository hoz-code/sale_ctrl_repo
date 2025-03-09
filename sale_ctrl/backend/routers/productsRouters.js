import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import { sqlActions } from '../controllers/toolsdatabase.js';

const routersProducts = express.Router();

const sqlAction = sqlActions


routersProducts.get('/product/all', (req, res) => {
    console.log('all');
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlAction.selectAllRows(sqlAnswer);
});

routersProducts.post('/product/create', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        console.log('sqlanswer');
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlAction.createRow(req.body, sqlAnswer);
});

routersProducts.get('/delete/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlAction.deleteIdRow(req.params, sqlAnswer);
});

routersProducts.get('/product/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlAction.selectIdRow(req.params, sqlAnswer);
});

routersProducts.post('/product/update/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlAction.updateIdRow(req.body, sqlAnswer);
});


export { routersProducts };