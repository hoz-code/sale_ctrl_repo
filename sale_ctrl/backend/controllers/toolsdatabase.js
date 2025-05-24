import { db } from '../app.js';



const sqlActions = {

    createRow: (dataToCreate, sqlAnswer) => {
        const sqlStatementProducts = `INSERT INTO ${dataToCreate[0].name} (${dataToCreate[0].column_one.name} , ${dataToCreate[0].column_two.name}) VALUES(?, ?)`;
        const sqlvaluesProducts = [dataToCreate[0].column_one.value, dataToCreate[0].column_two.value];
        const sqlStatementStocks = `INSERT INTO ${dataToCreate[1].name} (${dataToCreate[1].column_one.name} , ${dataToCreate[1].column_two.name}) VALUES(?, ?)`;
        const sqlvaluesStocks = [dataToCreate[1].column_one.value, dataToCreate[1].column_two.value];
        const sqlStatementPrices = `INSERT INTO ${dataToCreate[2].name} (${dataToCreate[2].column_one.name} , ${dataToCreate[2].column_two.name}) VALUES(?, ?)`;
        const sqlvaluesPrice = [dataToCreate[2].column_one.value, dataToCreate[2].column_two.value];
        db.serialize(() => {
            db.run(sqlStatementProducts, sqlvaluesProducts, (err) => {
                if (!err) {
                    db.run(sqlStatementStocks, sqlvaluesStocks, (err) => {
                        if (!err) {
                            db.run(sqlStatementPrices, sqlvaluesPrice, (err) => {
                                if (!err) {
                                    sqlAnswer(null, { "res": "All rows are ok" });
                                } else {
                                    sqlAnswer({ "res": "There is some error price", "err": `${err}` }, null);
                                }
                            });
                        } else {
                            sqlAnswer({ "res": "There is some error in stock", "err": `${err}` }, null);
                        }
                    });
                } else {
                    sqlAnswer({ "res": "There is some error Product", "err": `${err}` }, null);
                }
            });
        });
    },
    deleteIdRow: (req, sqlAnswer) => {
        const code = req.id
        const sqlStatementDeletePrice = `DELETE FROM prices WHERE fkcode = ${code};`
        const sqlStatementDeleteStock = `DELETE FROM stocks WHERE fkcode = ${code};`
        const sqlStatementDeleteProducts = `DELETE FROM products WHERE code = ${code};`
        db.serialize(() => {
            db.run(sqlStatementDeletePrice, (err, row) => {
                if (!err) {
                    db.run(sqlStatementDeleteStock, (err, row) => {
                        if (!err) {
                            db.run(sqlStatementDeleteProducts, (err, row) => {
                                if (!err) {
                                    sqlAnswer(null, { "ans": "all was delete" })
                                } else {
                                    sqlAnswer({ "ans": "erro Products delete" }, null)
                                }
                            })
                        } else {
                            sqlAnswer({ "ans": "erro Products Stocks" }, null)
                        }
                    })
                } else {
                    sqlAnswer({ "ans": "erro Products price" }, null)
                }
            });
        });
    },

    selectAllRows: (sqlAnswer) => {
        const sqlstatement = `SELECT * FROM products
        INNER JOIN stocks ON products.code = stocks.fkcode
        INNER JOIN prices ON products.code = prices.fkcode;`;
        const sqlcallback = (err, rows) => {
            if (!err) {
                sqlAnswer(null, rows);
            } else {
                sqlAnswer(err.message);
            }
        };
        db.all(sqlstatement, sqlcallback);
    },

    downloadcsv: (sqlAnswer) => {
        const sqlstatement = `SELECT products.code, products.name, stocks.stock, prices.price 
        FROM products 
        INNER JOIN stocks ON products.code = stocks.fkcode 
        INNER JOIN prices ON products.code = prices.fkcode;`;
        const sqlcallback = (err, rows) => {
            if (!err) {
                sqlAnswer(null, rows);
            } else {
                sqlAnswer(err.message, null);
            }
        };
        db.all(sqlstatement, sqlcallback);
    },

    selectIdRow: (req, sqlAnswer) => {
        const code = req.id
        const sqlStatementProduct =
            `SELECT * FROM products 
            INNER JOIN stocks ON products.code = stocks.fkcode
            INNER JOIN prices ON products.code = prices.fkcode
            WHERE code = ${code};`;
        db.serialize(() => {
            db.get(sqlStatementProduct, (err, row) => {
                if (!err) {
                    sqlAnswer(null, row)
                } else {
                    sqlAnswer(err, null)
                }
            });
        });
    },
    updateIdRow: (dataToUpdate, sqlAnswer) => {
        //UPDATE products SET name = 
        const updateProductName = `UPDATE ${dataToUpdate[0].name} SET ${dataToUpdate[0].column_two.name} = ? WHERE  ${dataToUpdate[0].column_one.name} = ?;`;
        const updateProductData = [dataToUpdate[0].column_two.value, dataToUpdate[0].column_one.value];
        const updateStockName = `UPDATE ${dataToUpdate[1].name} SET ${dataToUpdate[1].column_two.name} = ? WHERE  ${dataToUpdate[1].column_one.name} = ?;`;
        const updateStockData = [dataToUpdate[1].column_two.value, dataToUpdate[1].column_one.value];
        const updatePriceName = `UPDATE ${dataToUpdate[2].name} SET ${dataToUpdate[2].column_two.name} = ? WHERE  ${dataToUpdate[2].column_one.name} = ?;`;
        const updatePriceData = [dataToUpdate[2].column_two.value, dataToUpdate[2].column_one.value];
        db.serialize(() => {
            db.run(updateProductName, updateProductData, (err) => {
                if (!err) {
                    db.run(updateStockName, updateStockData, (err) => {
                        if (!err) {
                            db.run(updatePriceName, updatePriceData, (err) => {
                                if (!err) {
                                    sqlAnswer(null, { "res": "All rows were updated ok" });
                                } else {
                                    sqlAnswer({ "res": "There is some error price", "err": `${err}` }, null);
                                }
                            });
                        } else {
                            sqlAnswer({ "res": "There is some error in stock", "err": `${err}` }, null);
                        }
                    });
                } else {
                    sqlAnswer({ "res": "There is some error Product", "err": `${err}` }, null);
                }

            });
        });
    },
    createSale: (dataToCreate, sqlAnswer) => {
        console.log(dataToCreate)
        const sqlStatementTotalSale = `INSERT INTO ${dataToCreate[0].nameTable} (${dataToCreate[0].column_one.name}) VALUES(?)`;
        const sqlStatementTotalSaleValue = [dataToCreate[0].column_one.value]
        db.serialize(() => {
            db.run(sqlStatementTotalSale, sqlStatementTotalSaleValue, (err) => {
                if (!err) {
                    const i = 1;
                    for (let i = 1; i < dataToCreate.length; i++) {
                        const sqlStatementSale = `INSERT INTO ${dataToCreate[i].nameTable}(
                        ${dataToCreate[i].column_one.name}, 
                        ${dataToCreate[i].column_two.name}, 
                        ${dataToCreate[i].column_three.name},
                        ${dataToCreate[i].column_four.name},
                        ${dataToCreate[i].column_five.name},
                        ${dataToCreate[i].column_six.name}
                        ) VALUES(?, ?, ?, ?, ?, ?)`;
                        const sqlValuesSale = [
                            dataToCreate[i].column_one.value,
                            dataToCreate[i].column_two.value,
                            dataToCreate[i].column_three.value,
                            dataToCreate[i].column_four.value,
                            dataToCreate[i].column_five.value,
                            dataToCreate[i].column_six.value
                        ];
                        db.run(sqlStatementSale, sqlValuesSale, (err) => {
                            if (!err) {
                                console.log('sale row ok inserted')
                                //sqlAnswer(null, { "res": "All rows are ok" });
                            }
                            else {
                                console.log(`sale row error${err}`)
                                sqlAnswer({ "res": "There is some error in insert each sale", "err": `${err}` }, null);
                            }
                        })

                        const sqlStatementUpdateStocks = `UPDATE stocks SET ${dataToCreate[i].column_five.name} = ${dataToCreate[i].column_five.name} - 1 
                        WHERE  ${dataToCreate[i].column_three.name} = ?;`;
                        const sqlStatementUpdateStocksValue = [dataToCreate[i].column_three.value]
                        db.run(sqlStatementUpdateStocks, sqlStatementUpdateStocksValue, (err) => {
                            if (!err) {
                                console.log('stock row was update')
                            } else {
                                sqlAnswer({ "res": "There is some error in update stock", "err": `${err}` }, null);
                            }
                        })
                    }

                }
                else {
                    sqlAnswer({ "res": "There is some error in insert total sales", "err": `${err}` }, null);
                }
            })
        })
        sqlAnswer(null, { "res": "All rows are ok" });
    },
    createMasiveRows: (dataToCreate, sqlAnswer) => {
        console.log('dataCreaate')
        console.log(dataToCreate)
        const lines = dataToCreate.split('\n');
        console.log(lines)
        lines.forEach(line => {
            const [id, name, stock, price] = line.split(',')
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
        sqlAnswer(null, { "message": "File uploaded successfully!" })
    }
}

export { sqlActions }
