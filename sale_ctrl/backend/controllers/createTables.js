import { db } from '../config/createdb.js';

const tableProducts = () => {
    db.run(`CREATE TABLE IF NOT EXISTS products (code INT PRIMARY KEY, name TEXT NOT NULL);`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};

const tableStocks = () => {
    db.run(`CREATE TABLE IF NOT EXISTS stocks 
        (fkcode INT, stock INT NOT NULL, FOREIGN KEY(fkcode) REFERENCES products(code));`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};

const tablePrices = () => {
    db.run(`CREATE TABLE IF NOT EXISTS prices 
        (fkcode INT, price INT NOT NULL, FOREIGN KEY(fkcode) REFERENCES products(code));`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};


const tableSales = () => {
    db.run(`CREATE TABLE IF NOT EXISTS sales
        (time NUMERIC NOT NULL,
        fktime NUMERIC,
        fkcode INT, 
        FOREIGN KEY(fkcode) REFERENCES products(code),
        FOREIGN KEY(fktime) REFERENCES totalsales(time)
        );`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};

const tableTotalSales = () => {
    db.run(`CREATE TABLE IF NOT EXISTS totalsales
        (time NUMERIC PRIMARY KEY)
        ;`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};

//tableProducts();
//tableTotalSales();

//tableStocks();
//tablePrices();
//tableSales();





// node controllers/createTables.js


