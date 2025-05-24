import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer'


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const upload = multer({ dest: 'uploadsx/' })
console.log('**********************************')
console.log(upload)
import { sqlActions } from '../controllers/toolsdatabase.js';

const routersProducts = express.Router();

const sqlAction = sqlActions


routersProducts.get('/product/csv', (req, res) => {
    const sqlAnswer = (err, rows) => {
        if (!err) {
            console.log(rows)
            const csvWriter = createObjectCsvWriter({
                path: 'inventario.csv',
                header: [
                    { id: 'code', title: 'codigo' },
                    { id: 'name', title: 'articulo' },
                    { id: 'stock', title: 'cantidad' },
                    { id: 'price', title: 'valor' },
                ]
            })
            csvWriter.writeRecords(rows).then(() => {
                console.log('CSV file created')
                res.download('inventario.csv')
            }).catch(err => {
                console.error('Error writing CSV:', err);
                res.status(500).send('CSV generation error');
            })

        } else {
            console.error(err);
        }
    };
    sqlAction.downloadcsv(sqlAnswer);
});

routersProducts.get('/product/all', (req, res) => {
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

routersProducts.post('/product/masivecreate', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path
    console.log(filePath)
    const fileContents = fs.readFileSync(filePath, "utf8");
    console.log(fileContents)
    console.log('File Update: ', req.file)
    const sqlAnswer = (err, sqlAnswer) => {
        console.log('masivecreate');
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    //sqlAnswer(null, { "all": "ok" })
    sqlAction.createMasiveRows(fileContents, sqlAnswer);
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