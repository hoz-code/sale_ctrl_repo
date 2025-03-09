import { db } from '../config/createdb.js';

const select_columns = (tablename) => {
    return new Promise((resolve, rejected) => {
        db.all(`PRAGMA table_info('${tablename}');`, (err, rows) => {
            if (!err) {
                console.log(resolve(rows));
            }
            else {
                rejected(err.message);
            }
        });
    });
};


const checkForeignKey = () => {
    return new Promise((resolve, rejected) => {
        db.get(`PRAGMA foreign_keys;`, (err, row) => {
            if (!err) {
                console.log(resolve(row));
            }
            else {
                rejected(err.message);
            }
        });
    });
};

const sqlite_master = () => {
    db.all(`SELECT * FROM sqlite_master;`, (err, rows) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(`Im error ${err.message}`);
            return;
        }
    });
};

const dropTable = (tableName) => {
    db.run(`DROP TABLE ${tableName};`, (err, rows) => {
        if (!err) {
            console.log('Drop has been ok!');
        } else {
            console.log(`Im error ${err.message}`);
            return;
        }
    });
};

const printdd = async () => {
    const d = await select_columns('prices');
    const e = await checkForeignKey();
    console.log(d);
    console.log(e)
};

const selectDataFromTable = (nameTable) => {
    db.all(`SELECT * FROM ${nameTable};`, (err, rows) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(`Im error ${err.message}`);
            return;
        }
    });
}
//printdd();

//dropTable('products');
//dropTable('totalsales');
//dropTable('prices');
//sqlite_master();
//select_columns('stocks');
//tableProducts();
//tableStocks()
//tablePrices()
//selectDataFromTable('sales')
//selectDataFromTable('totalsales')



// node controllers/devToolsDataBase.js
// node sqlite3.exe