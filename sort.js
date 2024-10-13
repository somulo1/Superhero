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
                aValue = parseFloat(a.appearance.height[1]) || 0;  // Assumes height is in the format [ft, cm]
                bValue = parseFloat(b.appearance.height[1]) || 0;
                break;
            case 'weight':
                aValue = parseFloat(a.appearance.weight[1]) || 0;  // Assumes weight is in the format [lb, kg]
                bValue = parseFloat(b.appearance.weight[1]) || 0;
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

        return ascending ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });
}

const generateTable = () => {
    // Clear any existing table
    const existingTable = document.querySelector('#superhero-table tbody');
    if (existingTable) {
        existingTable.innerHTML = ''; // Clear existing rows
    }

    // Calculate start and end indices for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = pageSize === 'All' ? filteredData.length : Math.min(startIndex + pageSize, filteredData.length);

    // Loop through array for current page
    for (let i = startIndex; i < endIndex; i++) {
        const item = filteredData[i];
        const row = document.createElement('tr');

        // Create cells for icon
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
            .map(([key, value]) => `${key}: ${value}`).join(', ');
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

        existingTable.append(row);
    }

    // Update pagination controls
    updatePaginationControls();
}

// Search function to filter the data
const searchSuperheroes = (query) => {
    query = query.toLowerCase();
    filteredData = superheroes.filter(hero => hero.name.toLowerCase().includes(query));
    sortData(currentSortColumn, isAscending);  // Ensure sorting is applied on filtered data
    currentPage = 1;  // Reset to first page when searching
    generateTable();
}

// Create search input field
const createSearchInput = () => {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
        searchSuperheroes(event.target.value);
    });
}

// Create pagination controls
const createPaginationControls = () => {
    const paginationDiv = document.getElementById('pagination-controls');

    // Previous button
    const prevButton = paginationDiv.querySelector('#prev-button');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            generateTable();
        }
    });

    // Next button
    const nextButton = paginationDiv.querySelector('#next-button');
    nextButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredData.length / pageSize)) {
            currentPage++;
            generateTable();
        }
    });

    // Page size select
    const pageSizeSelect = paginationDiv.querySelector('#page-size');
    pageSizeSelect.addEventListener('change', (event) => {
        pageSize = event.target.value === 'All' ? filteredData.length : parseInt(event.target.value);
        currentPage = 1;  // Reset to first page when changing page size
        generateTable();
    });
}

// Update pagination controls
const updatePaginationControls = () => {
    const paginationDiv = document.getElementById('pagination-controls');
    const [prevButton, pageInfo, nextButton] = paginationDiv.children;

    const totalPages = Math.ceil(filteredData.length / pageSize);

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || pageSize === 'All';

    // Update page info
    const pageInfoSpan = paginationDiv.querySelector('#page-info');
    pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Fetch superhero data and initialize table and search
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        superheroes = data;
        filteredData = superheroes;
        createSearchInput();  // Create the search input
        createPaginationControls();  // Create pagination controls
        sortData('name', true);  // Initial sort by name in ascending order
        generateTable();  // Generate the initial table
    }); 
