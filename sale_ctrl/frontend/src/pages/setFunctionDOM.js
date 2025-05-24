let totalsale = parseInt(0);
let totalSaleVisual = 0;
let saleControlStock = {}
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

        htmlElement['span-totalsale'].innerHTML = '$ 0,00'

        let saleControlClean = Object.entries(saleControlStock)
        saleControlClean.forEach((key) => {
            delete saleControlStock[`${key[0]}`]
        })
    },

    populateTable: (dataFromFetch, htmlElement) => {
        const availableBodyTableProducts = htmlElement['available-body-table-products']

        for (let i = 0; i < dataFromFetch.length; i++) {

            const tableRow = document.createElement("tr")
            tableRow.className = 'table-light'

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
            if (Object.keys(saleControlStock).length == 0 || (!([codeFromTable] in saleControlStock))) {
                saleControlStock[codeFromTable] = [stockFromTable];
            }
            else {
                console.log('code already exists')
            }
            if (saleControlStock[codeFromTable] != 0) {
                console.log(saleControlStock[codeFromTable])

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
                totalSaleVisual = currencyFormat(totalsale)
                htmlElement['span-totalsale'].innerHTML = totalSaleVisual

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
                    totalSaleVisual = currencyFormat(totalsale)
                    htmlElement['span-totalsale'].innerHTML = totalSaleVisual
                    salesTableBody.removeChild(tr)
                    saleControlStock[codeFromTable] = saleControlStock[codeFromTable] + 1
                }
                saleControlStock[codeFromTable] = saleControlStock[codeFromTable] - 1;
            }
            else {
                console.log('code is empty right now')
            }
        } else {
            console.log('code without stock')
        }
    },

    radioBehavior: (htmlElement) => {
        console.log(htmlElement)
        const radioo = document.getElementById('radio-optone')
        const radiot = document.getElementById('radio-opttwo')
        const radior = document.getElementById('radio-optthree')
        console.log(radioo)
        console.log(radiot)
        console.log(radior)
        alert(`${radioo}  1 ${radiot}  2   ${radior}   3`)
    },

    getFileContent: (htmlElement) => {
        const fileInput = htmlElement['input-file']
        console.log(fileInput.files)
        if (fileInput.files.length === 0) {
            alert('Seleccione un archivo')
            return;
        }
        const formData = new FormData()
        formData.append('csvFile', fileInput.files[0])
        return formData
    }
}

export { htmlDOMFunctions }
