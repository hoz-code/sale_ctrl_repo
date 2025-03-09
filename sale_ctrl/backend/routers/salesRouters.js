import express from 'express';
import { sqlActions } from '../controllers/toolsdatabase.js';
const sqlAction = sqlActions

const salesRouters = express.Router();

salesRouters.post('/saleconfirmed', (req, res) => {
    console.log('server side')
    res.send({ "res": "sales" })
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlAction.createSale(req.body, sqlAnswer);
});

export { salesRouters }