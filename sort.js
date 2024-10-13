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
