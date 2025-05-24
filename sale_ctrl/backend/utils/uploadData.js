import { db } from '../app.js';
import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('DB.csv');

const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity, });

rl.on('line', (line) => {
    const [id, name, stock, price] = line.split(',');
    
    const sqlStatementProducts = `INSERT INTO products (code , name) VALUES(?, ?)`;
    const sqlStatementStocks = `INSERT INTO stocks (fkcode , stock) VALUES(?, ?)`;
    const sqlStatementPrices = `INSERT INTO prices (fkcode, price) VALUES(?, ?)`;
    db.serialize(() => {
        db.run(sqlStatementProducts, [id, name], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
        db.run(sqlStatementStocks, [id, stock], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
        db.run(sqlStatementPrices, [id, price], (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
    })
});


rl.on('close', () => {
    console.log('Data successfully imported!');
    db.close();
});

// node utils/uploadData.js