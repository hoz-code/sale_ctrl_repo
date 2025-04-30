import express from 'express';
import path from 'path';
import { userRouters } from './routers/userRouters.js';
import { fileURLToPath } from 'url';
import { indexRouters } from './routers/indexRouters.js';
import { createFileDataBase } from './config/createdb.js';
import { createTable } from './controllers/createTables.js';

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use(express.json());
app.use('/app', userRouters);
app.use('/api', indexRouters);


const db = createFileDataBase.createDataBase();


createTable.tableProducts(db);
createTable.tableStocks(db);
createTable.tablePrices(db);
createTable.tableTotalSales(db);
createTable.tableSales(db);

export { db }

app.listen(port, () => {
    console.log(`server listening by port ${port}`);
});


