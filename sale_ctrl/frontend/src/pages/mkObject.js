const formatDataToFetch = {

    makeObject: (allElements) => {
        const sqlObject = [];
        const constructorObject = (tagName, keyColumn) => {
            const tables = {
                name: allElements[tagName].dataset.tableName,
                column_one: {
                    name: allElements['input-code'].dataset[keyColumn],
                    value: allElements['input-code'].value
                },
                column_two: {
                    name: allElements[tagName].dataset.columnName,
                    value: allElements[tagName].value
                }
            }
            sqlObject.push(tables)
        }
        constructorObject('input-productname', 'columnName')
        constructorObject('input-stock', 'columnStocks')
        constructorObject('input-price', 'columnPrices')
        return sqlObject
    },

    groupSales: (allElements) => {
        const sqlObject = [];
        const htmlElementsDOMNow = allElements
        const salesFromTable = htmlElementsDOMNow['sales-body-table-products']

        const oneRow = {
            nameTable: 'totalsales',
            column_one: {
                name: 'time',
                value: salesFromTable.children[0].children[4].innerHTML
            }
        }
        sqlObject.push(oneRow)

        for (let i = 0; i < salesFromTable.childElementCount; i++) {

            const row = {
                nameTable: 'sales',

                column_one: {
                    name: 'time',
                    value: salesFromTable.children[i].children[4].innerHTML
                },

                column_two: {
                    name: 'fktime',
                    value: salesFromTable.children[0].children[4].innerHTML
                },

                column_three: {
                    name: 'fkcode',
                    value: salesFromTable.children[i].children[0].innerHTML
                },

                column_four: {
                    name: 'name',
                    value: salesFromTable.children[i].children[1].innerHTML
                },

                column_five: {
                    name: 'stock',
                    value: salesFromTable.children[i].children[3].innerHTML
                },

                column_six: {
                    name: 'price',
                    value: salesFromTable.children[i].children[2].innerHTML
                }
            }
            sqlObject.push(row)
        }

        return sqlObject
    },

    
}

export { formatDataToFetch }