const htmlDOMFunctions = {
    showSearch: (dataFromFetch, htmlElement) => {
        htmlElement['input-productname'].value = dataFromFetch['name']
        htmlElement['input-stock'].value = dataFromFetch['stock']
        htmlElement['input-price'].value = dataFromFetch['price']
    },

    insertSale: (htmlElement) => {
        const itemContainer = document.createElement("div")
        itemContainer.id = 'item-container'
        itemContainer.className = 'item-container'

        const productCode = document.createElement("div")
        productCode.id = 'product-code'
        const productName = document.createElement("div")
        productName.id = 'product-name'
        const productCost = document.createElement("div")
        productCost.id = 'product-price'
        const productTimeSale = document.createElement("div")
        productTimeSale.id = 'product-timesale'

        const saleContainer = htmlElement['sale-container']

        const code = htmlElement['input-code'].value
        const name = htmlElement['input-productname'].value
        const cost = htmlElement['input-price'].value
        const timeStampNow = Date.now()

        productCode.textContent = code
        productName.textContent = name
        productCost.textContent = cost
        productTimeSale.textContent = timeStampNow

        saleContainer.appendChild(itemContainer)
        itemContainer.appendChild(productCode)
        itemContainer.appendChild(productName)
        itemContainer.appendChild(productCost)
        itemContainer.appendChild(productTimeSale)
    },

    saleclean: (htmlElement) => {
        const saleContainer = htmlElement['sale-container']
        saleContainer.innerHTML = 'Sale Container'
        htmlElement['input-code'].value = ''
        htmlElement['input-productname'].value = ''
        htmlElement['input-price'].value = ''
        htmlElement['input-stock'].value = ''
    }


}

export { htmlDOMFunctions }
