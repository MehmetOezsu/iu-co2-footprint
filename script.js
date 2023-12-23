// Funktion zum Laden des Headers
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-co2').innerHTML = data;
        });
}

// Funktion zum Laden des Footers
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-co2').innerHTML = data;
        });
}

// Aufrufen vom Header und Footer beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});

// Funktion zum Sortieren der Tabelle
function sortTable(column) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dataTable");
    switching = true;
    // Setzt die Sortierrichtung auf aufsteigend
    dir = "asc"; 
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            // Überprüft, ob die Zeilen in der richtigen Reihenfolge sind, abhängig von der Richtung:
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } else {
            //Wenn kein Wechsel erfolgt ist und die Richtung "asc" ist, dann wird die Richtung gändert und der Loop noch einmal durchlaufen.
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

// Funktion zum Filtern der Tabelle
function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        // Hier wird angenommen, dass die erste Spalte Unternehmen und die zweite Spalte Länder enthält
        tdCompany = tr[i].getElementsByTagName("td")[0];
        tdCountry = tr[i].getElementsByTagName("td")[1];

        if (tdCompany || tdCountry) {
            txtValueCompany = tdCompany ? tdCompany.textContent || tdCompany.innerText : "";
            txtValueCountry = tdCountry ? tdCountry.textContent || tdCountry.innerText : "";

            if (txtValueCompany.toUpperCase().indexOf(filter) > -1 || txtValueCountry.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}
