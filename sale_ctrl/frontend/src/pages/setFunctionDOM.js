let totalsale = parseInt(0);
let saleControl = {}
const currencyFormat = (number) => {
    const currencyFormat = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(number)
    return currencyFormat
}
const htmlDOMFunctions = {

    showSearch: (dataFromFetch, htmlElement) => {
        htmlElement['input-productname'].value = dataFromFetch['name']
        htmlElement['input-stock'].value = dataFromFetch['stock']
        htmlElement['input-price'].value = dataFromFetch['price']
    },

    saleclean: (htmlElement) => {
        const salesFromTable = htmlElement['sales-body-table-products']
        totalsale = parseInt(0);
        const numberOfCHildren = salesFromTable.children.length
        let i = parseInt(1)
        while (i <= numberOfCHildren) {
            salesFromTable.removeChild(salesFromTable.firstElementChild)
            i++;
        }
        htmlElement['span-totalsale'].innerHTML = 0
        let saleControlClean = Object.entries(saleControl)
        saleControlClean.forEach((key) => {
            delete saleControl[`${key[0]}`]
        })
    },

    populateTable: (dataFromFetch, htmlElement) => {
        const availableBodyTableProducts = htmlElement['available-body-table-products']

        for (let i = 0; i < dataFromFetch.length; i++) {

            const tableRow = document.createElement("tr")
            tableRow.className = 'class-table-row'

            const column_one = document.createElement("td")
            column_one.className = 'class-column-one'
            column_one.innerHTML = dataFromFetch[i]['code']

            const column_two = document.createElement("td")
            column_two.className = 'class-column-two'
            column_two.innerHTML = dataFromFetch[i]['name']

            const column_three = document.createElement("td")
            column_three.className = 'class-column-three'
            column_three.innerHTML = dataFromFetch[i]['stock']

            const column_four = document.createElement("td")
            column_four.className = 'class-column-four'
            column_four.innerHTML = currencyFormat(dataFromFetch[i]['price'])

            availableBodyTableProducts.appendChild(tableRow)
            tableRow.appendChild(column_one)
            tableRow.appendChild(column_two)
            tableRow.appendChild(column_three)
            tableRow.appendChild(column_four)

            tableRow.ondblclick = () => {
                htmlDOMFunctions.insertItemFromTable(dataFromFetch[i]['code'], dataFromFetch[i]['name'], dataFromFetch[i]['stock'], dataFromFetch[i]['price'], htmlElement)
            }
        }

    },
    insertItemFromTable: (codeFromTable, nameFromTable, stockFromTable, priceFromTable, htmlElement) => {
        if (stockFromTable > 0) {
            if (Object.keys(saleControl).length == 0 || (!([codeFromTable] in saleControl))) {
                saleControl[codeFromTable] = [stockFromTable];
            }
            else {
                console.log('code already exists')
            }
            if (saleControl[codeFromTable] != 0) {
                console.log(saleControl[codeFromTable])

                const tr = document.createElement("tr")
                tr.className = 'table-sales-row'

                const salesTableBody = htmlElement['sales-body-table-products']

                let code = codeFromTable
                let name = nameFromTable
                let cost = parseInt(priceFromTable)
                let visualCost = currencyFormat(priceFromTable)
                let stock = stockFromTable
                let timeStampNow = Date.now()

                totalsale = totalsale + cost

                htmlElement['span-totalsale'].innerHTML = totalsale

                const column_one = document.createElement("td")
                column_one.className = 'sale-column-one'
                column_one.innerHTML = code
                tr.appendChild(column_one)

                const column_two = document.createElement("td")
                column_two.className = 'sale-column-two'
                column_two.innerHTML = name
                tr.appendChild(column_two)

                const column_three = document.createElement("td")
                column_three.className = 'sale-column-three'
                column_three.innerHTML = visualCost
                tr.appendChild(column_three)

                const column_four = document.createElement("td")
                column_four.className = 'sale-column-four'
                column_four.innerHTML = stock
                tr.appendChild(column_four)

                const column_five = document.createElement("td")
                column_five.className = 'sale-column-five'
                column_five.innerHTML = timeStampNow
                tr.appendChild(column_five)

                salesTableBody.appendChild(tr)

                tr.ondblclick = () => {
                    totalsale = totalsale - cost
                    htmlElement['span-totalsale'].innerHTML = totalsale
                    salesTableBody.removeChild(tr)
                    saleControl[codeFromTable] = saleControl[codeFromTable] + 1
                }
                saleControl[codeFromTable] = saleControl[codeFromTable] - 1;
            }
            else {
                console.log('code is empty right now')
            }
        } else {
            console.log('code without stock')
        }
    }
}

export { htmlDOMFunctions }
