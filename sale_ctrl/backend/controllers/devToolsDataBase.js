import { db } from '../app.js';

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

const selectAllDataFromTables = (nameTableOne, nameTableTwo, nameTableThree) => {
    const statementSQL = `SELECT * FROM ${nameTableOne} INNER JOIN ${nameTableTwo} ON ${nameTableOne}.code = ${nameTableTwo}.fkcode INNER JOIN ${nameTableThree} ON ${nameTableOne}.code = ${nameTableThree}.fkcode;`
    console.log(statementSQL)
    db.all(statementSQL, (err, rows) => {
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
//dropTable('sales');
//sqlite_master();
//select_columns('stocks');
//tableProducts();
//tableStocks()
//tablePrices()
//selectDataFromTable('products')
//selectDataFromTable('stocks')
//selectDataFromTable('prices')
//selectDataFromTable('justProbeTable')
//selectAllDataFromTables('products', 'stocks', 'prices')


// node controllers/devToolsDataBase.js
// node sqlite3.exe