import { getAllTags } from './getElements.js';
const htmlElements = getAllTags;

const htmlgetDOMData = {
    catchSales: () => {
        const htmlElementsDOMNow = htmlElements()
        const saleContainer = htmlElementsDOMNow['sale-container']
        const arrayChildrens = saleContainer.children
        console.log(arrayChildrens)
        for (let i = 0; i < saleContainer.childElementCount; i++) {
            console.log(arrayChildrens[i].querySelector('#product-code').textContent)
        }
    }
}

export { htmlgetDOMData }