const cssFunctions = {
    searchFilter: () => {
        // Declare variables
        let searchBox, stringSearch, avalaibleTableProducts, tr;
        searchBox = document.getElementById("search-box");
        stringSearch = searchBox.value.toUpperCase();
        avalaibleTableProducts = document.getElementById("available-table-products");
        tr = avalaibleTableProducts.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (let i = 0; i < tr.length; i++) {
            let txtFromSearchBox, td;
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtFromSearchBox = td.textContent || td.innerText;
                if (txtFromSearchBox.toUpperCase().indexOf(stringSearch) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

export { cssFunctions }
