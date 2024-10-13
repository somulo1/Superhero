// get data from an API endpoint 
const url = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

const body = document.querySelector('body');

const pageSizeOptions = [10, 20, 50, 100, 'All'];
let currentPage = 1;
let pageSize = 20;  // Default page size

let superheroes = [];  // To store all data
let filteredData = []; // To store filtered data based on search
let currentSortColumn = 'name'; // Initial sort by Name
let isAscending = true;  // Initial sort order is ascending

export function sort() {
    generateTable(filteredData);  // Initially generate table with full data
 }
 
 const createCell = (text, element) => {
     const td = document.createElement('td');
     if (element) {
         td.append(element);
     } else {
         td.textContent = text;
     }
     return td;
 }

// Sorting function to handle different data types
const sortData = (column, ascending) => {
    filteredData.sort((a, b) => {
        let aValue, bValue;

        switch (column) {
            case 'name':
                aValue = a.name || '';
                bValue = b.name || '';
                break;
            case 'fullName':
                aValue = a.biography.fullName || '';
                bValue = b.biography.fullName || '';
                break;
            case 'powerStats':
                aValue = Object.values(a.powerstats).reduce((sum, stat) => sum + (stat || 0), 0);
                bValue = Object.values(b.powerstats).reduce((sum, stat) => sum + (stat || 0), 0);
                break;
            case 'race':
                aValue = a.appearance.race || '';
                bValue = b.appearance.race || '';
                break;
            case 'gender':
                aValue = a.appearance.gender || '';
                bValue = b.appearance.gender || '';
                break;
             case 'height':
                aValue = parseFloat(a.appearance.height[0]) || 0;  // Assumes height is in the format [ft, cm]
                bValue = parseFloat(b.appearance.height[0]) || 0;
                break;
            case 'weight':
                aValue = parseFloat(a.appearance.weight[0]) || 0;  // Assumes weight is in the format [lb, kg]
                bValue = parseFloat(b.appearance.weight[0]) || 0;
                break;
            case 'placeOfBirth':
                aValue = a.biography.placeOfBirth || '';
                bValue = b.biography.placeOfBirth || '';
                break;
            case 'alignment':
                aValue = a.biography.alignment || '';
                bValue = b.biography.alignment || '';
                break;
            default:
                return 0;
        }

        // Handle missing values: missing values are always sorted last
        if (!aValue) return 1;
        if (!bValue) return -1;

        if (aValue < bValue) return ascending ? -1 : 1;
        if (aValue > bValue) return ascending ? 1 : -1;
        return 0;
    });
}

const generateTable = (loadData) => {
    // Clear any existing table
    const existingTable = document.querySelector('table');
    if (existingTable) {
        existingTable.remove();
    }

    // create table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // create header row
    const headers = [
        { label: "Icon", key: "icon" },
        { label: "Name", key: "name" },
        { label: "Full Name", key: "fullName" },
        { label: "PowerStats", key: "powerStats" },
        { label: "Race", key: "race" },
        { label: "Gender", key: "gender" },
        { label: "Height", key: "height" },
        { label: "Weight", key: "weight" },
        { label: "Place Of Birth", key: "placeOfBirth" },
        { label: "Alignment", key: "alignment" }
    ];

    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        const headerName = header.label;

        th.textContent = headerName;
        th.style.cursor = "pointer";  // Make the headers clickable for sorting
        th.addEventListener('click', () => {
            if (currentSortColumn === header.key) {
                isAscending = !isAscending;  // Toggle sort order
            } else {
                currentSortColumn = header.key;  // Sort by new column
                isAscending = true;  // Reset to ascending on new column
            }
            sortData(currentSortColumn, isAscending);  // Sort data
            generateTable(filteredData);  // Re-generate table
        });

        headerRow.append(th);
    });

    thead.append(headerRow);

    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = pageSize === 'All' ? loadData.length : Math.min(startIndex + pageSize, loadData.length);

    // loop through array for current page
    for (let i = startIndex; i < endIndex; i++) {
        const item = loadData[i];
        const row = document.createElement('tr');

        // create cells for icon
        const img = document.createElement('img');
        img.src = item.images.xs;
        img.alt = item.name;
        row.append(createCell("", img));

        // Name
        row.append(createCell(item.name));

        // Full Name
        row.append(createCell(item.biography.fullName));

        // Powerstats 
        const powerstats = Object.entries(item.powerstats)
            .map(([key, value]) => `${key}:${value} `);

        row.append(createCell(powerstats));

        // Race
        row.append(createCell(item.appearance.race));

        // Gender
        row.append(createCell(item.appearance.gender));

        // Height
        row.append(createCell(item.appearance.height[1]));

        // Weight
        row.append(createCell(item.appearance.weight[1]));

        // Place of Birth
        row.append(createCell(item.biography.placeOfBirth));

        // Alignment
        row.append(createCell(item.biography.alignment));

        tbody.append(row);
    }

    table.append(thead);
    table.append(tbody);

    body.append(table);

    // Update pagination controls
    updatePaginationControls();
}

// Search function to filter the data
const searchSuperheroes = (query) => {
    query = query.toLowerCase();
    filteredData = superheroes.filter(hero => hero.name.toLowerCase().includes(query));
    sortData(currentSortColumn, isAscending);  // Ensure sorting is applied on filtered data
    currentPage = 1;  // Reset to first page when searching
    generateTable(filteredData);
}

// Create search input field
const createSearchInput = () => {
    const searchDiv = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a superhero...';

    searchInput.addEventListener('input', (event) => {
        searchSuperheroes(event.target.value);
    });

    searchDiv.append(searchInput);
    body.insertBefore(searchDiv, body.firstChild);
}
