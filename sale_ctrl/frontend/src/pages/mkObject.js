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
        const saleContainer = htmlElementsDOMNow['sale-container']
        const arrayChildrens = saleContainer.children
        console.log(arrayChildrens)
        const oneRow = {
            nameTable: 'totalsales',
            column_one: {
                name: 'time',
                value: arrayChildrens[0].querySelector('#product-timesale').textContent
            }
        }
        sqlObject.push(oneRow)

        for (let i = 0; i < saleContainer.childElementCount; i++) {
            const row = {
                nameTable: 'sales',

                column_one: {
                    name: 'time',
                    value: arrayChildrens[i].querySelector('#product-timesale').textContent
                },

                column_two: {
                    name: 'fktime',
                    value: arrayChildrens[0].querySelector('#product-timesale').textContent
                },

                column_three: {
                    name: 'fkcode',
                    value: arrayChildrens[i].querySelector('#product-code').textContent
                }
            }
            sqlObject.push(row)
        }
        console.log(sqlObject)
        return sqlObject
    }
}


export { formatDataToFetch }