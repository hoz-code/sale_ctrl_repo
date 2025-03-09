import sqlite3 from 'sqlite3';

const createDataBase = () => {
    sqlite3.verbose();
    const db = new sqlite3.Database('main_db.db');
    foreignKeyOn(db);
    return db;
};

const foreignKeyOn = (db) => {
    db.run(`PRAGMA foreign_keys = ON;`, (err, row) => {
        if (!err) {
            console.log('Foreign Key is Enable');
        }
        else {
            console.error('Foreign Key is disable');
        }
    });
};

const dbs = createDataBase();
const db = dbs
console.log(db.eventNames)

export { db };
