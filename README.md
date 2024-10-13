# Superhero Data Organizer

Welcome to the Superhero Data Organizer project! In this web application, you, the villain, can organize and manage data about superheroes in a sleek and user-friendly manner. This project is built entirely from scratch without any frameworks or libraries.

## Table of Contents

- [Project Overview](#project-overview)
- [Instructions](#instructions)
- [Features](#features)
- [Getting Started](#getting-started)
- [Fetching Data](#fetching-data)
- [Display](#display)
- [Search Functionality](#search-functionality)
- [Sorting](#sorting)
- [Bonus Features](#bonus-features)
- [License](#license)
- [Repository](#repository)

## Project Overview

You are a villain and your dream is to get rid of those annoying, yoga-pant-wearing, weird masked superheroes. You never understood why some of them are considered to be superheroes, just because they are rich. Others annoy you with their philosophical speeches. We've found confidential information about those superheroes.

Your task is to build a web page to organize all the data about those smartypants. All that data can be found in `all.json`.


## Instructions

You are required to write all the code from scratch without using any external frameworks or libraries, such as React, Vue, or Svelte. This encourages a deeper understanding of JavaScript, HTML, and CSS, as well as how to manipulate the DOM and handle asynchronous operations.

## Features

The application will include features like:

- A responsive table to display superhero data.
- Search functionality for real-time filtering.
- Sorting capabilities for easy organization of information.
- Pagination for manageable viewing of large data sets.
- A clean and professional design.

## Getting Started

To get started, clone this repository" https://learn.zone01kisumu.ke/git/somulo/sortable " to your local machine. Open the `index.html` file in a web browser to view the application. Make sure to have an internet connection to fetch the superhero data.

## Fetching Data 

You will use the Fetch API to retrieve superhero data from an external source. The data is retrieved in JSON format, which is then parsed and processed to populate the table in your application. 

Here’s an example of how to fetch the data:

```javascript
// This function is called only after the data has been fetched and parsed.
const loadData = heroes => {
  console.log(heroes);
}

// Request the file with fetch; the data will be downloaded to your browser cache.
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then((response) => response.json()) // parse the response from JSON
  .then(loadData); // Call loadData with the parsed data
```
### Display

The superhero information will be displayed in a structured table format. Each superhero will have their icon, name, full name, power stats, race, gender, height, weight, place of birth, and alignment presented in a clean and organized manner.

The data will be divided into pages, allowing users to select how many entries to view at once (10, 20, 50, 100, or all).
### Search Functionality

Users will be able to filter the superhero list by typing into a search bar. The results will dynamically update as the user types, allowing for an interactive and user-friendly experience. This feature enhances the usability of the application by making it easy to find specific heroes.
### Sorting

The application will support sorting of the displayed data based on any of the columns in the table. Users can click on the column headers to sort the data either in ascending or descending order. This will include both string and numerical sorting, ensuring that data is organized in a meaningful way.

### Bonus Features

To further enhance the application, consider implementing additional features such as:

Customizable search filters, allowing users to specify fields to search.
    Advanced search operators for more complex queries (include, exclude, fuzzy, etc.).
    A detail view for each superhero, displaying more comprehensive information and larger images.
    Improved design elements using CSS for a more attractive user interface.
    URL modifications to maintain search states, enabling users to share links with specific filters.

## Collaboration

We welcome contributions to this project! If you have ideas, suggestions, or improvements, feel free to fork the repository and create a pull request. Please ensure that your contributions align with the project's goals and standards.

## Authors

This project was developed by:

 1: Samuel okoth omulo

 2: Kevin Wasonga
 
 3: Doreen Onyango

## License

This project is licensed under the MIT License, allowing others to use and modify the code freely, as long as proper credit is given.