import { getAllTags } from './getElements.js';
import { htmlFunctions } from './setFunctions.js';
import { htmlDOMFunctions } from './setFunctionDOM.js';
//import { htmlgetDOMData } from './setFunctionGetDOMinfo.js'

const htmlDOMFunction = htmlDOMFunctions


const htmlElements = getAllTags();

const htmlFunction = htmlFunctions

const now = new Date()
//alert(now)
//alert(now.toISOString())


// Fetch Functions
htmlElements['button-search'].onclick = async () => {
    const data = await htmlFunction.selectRowByCode(getAllTags());
    console.log(data)
    htmlDOMFunction.showSearch(data, getAllTags())
}
htmlElements['button-save'].onclick = () => htmlFunction.createrow(getAllTags());
htmlElements['button-allRows'].onclick = () => htmlFunction.selectAllRows(getAllTags());
htmlElements['button-delete'].onclick = () => htmlFunction.deleteRowByCode(getAllTags());
htmlElements['button-update'].onclick = () => htmlFunction.updateRowByCode(getAllTags());




// DOM Functions
htmlElements['button-insert'].onclick = () => htmlDOMFunction.insertSale(getAllTags());
htmlElements['button-saleclean'].onclick = () => htmlDOMFunction.saleclean(getAllTags());


htmlElements['button-confirm'].onclick = () => htmlFunction.totalizeSales(getAllTags());

















//allElements['button-save'].onclik = // make object //call fetch with all object


//console.log(events.eventt())

/*import { showToastMessage } from '../components/toastmessage.js';
import { validatehtmldata } from '../components/validatehtmldata.js';







elementtoprobe.setAttribute('required', true);






const allIdHtmldata = validatehtmldata.getAllIds();



const verifyData = {
    empty: (data) => {
        try {
            if (!(data === null || data === '')) {
                return data;
            } else {
                throw new Error(`${data}, empty data errorxxxxxxxxxxxxx`);
            }
        }
        catch (error) {
            throw new Error(error);
        }
    },
};

const browsermessage = {
    show: (message) => {
        const time = 1000;
        showToastMessage(message, time);
    }
};

const catchDatafromhtml = {
    boxcode: () => { return verifyData.empty(document.getElementById('fcode').value); },
    boxproduct: () => { return verifyData.empty(document.getElementById('fproductname').value); },
    boxsmount: () => { return verifyData.empty(document.getElementById('famount').value); }
};



async function readrow() {
    try {
        const boxcode = catchDatafromhtml.boxcode();
        let responsefetch = await fetch(`http://localhost:8080/read/${boxcode}`);
        if (!responsefetch.ok) {
            throw new Error(`Response status from fetch: ${responsefetch.status}`);
        }
        const json = await responsefetch.json();
        const spancode = document.getElementById('spancode');
        const spanproduct = document.getElementById('spanproduct');
        const spanamount = document.getElementById('spanamount');
        spancode.innerHTML = `${json.code}`;
        spanproduct.innerHTML = `${json.product}`;
        spanamount.innerHTML = `${json.amount}`;
        console.log(json);
    }
    catch (error) {
        browsermessage.show(error);
    }
}

async function updaterow() {
    try {
        const boxcode = catchDatafromhtml.boxcode();
        try {
            const boxproduct = catchDatafromhtml.boxproduct();
            const boxsmount = catchDatafromhtml.boxsmount();
            const datatofetch = { code: boxcode, product: `${boxproduct}`, amount: boxsmount };
            const datafetchjson = JSON.stringify(datatofetch);
            const setfectch = { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: datafetchjson };
            let responsefetch = await fetch("http://localhost:8080/update", setfectch);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            console.log(json);
        }
        catch (error) {

        }
    }
    catch (error) {
        browsermessage.show(error);
    }
}

async function deleterow() {
    try {
        const boxcode = catchDatafromhtml.boxcode();
        const datatofetch = { code: boxcode };
        const datafetchjson = JSON.stringify(datatofetch);
        const setfectch = { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: datafetchjson };
        let responsefetch = await fetch("http://localhost:8080/delete", setfectch);
        if (!responsefetch.ok) {
            throw new Error(`Response status from fetch: ${responsefetch.status}`);
        }
        const json = await responsefetch.json();
        console.log(json);
    }
    catch (error) {
        browsermessage.show(error);
    }
}



//export { alertfunction }



*/