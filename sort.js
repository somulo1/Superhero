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