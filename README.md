# Superhero Data Organizer

Welcome to the Superhero Data Organizer project! In this project data about superhero is organized in a user friendly way, and you can view your prefered superhero without having to view all of them. This project is built entirely from scratch without any frameworks or libraries.

## Features

The application include features like:

- A responsive table to display superhero data.
- Search functionality for real-time filtering.
- Sorting capabilities for easy organization of information.
- Pagination for manageable viewing of large data sets.
- A clean and professional design.

## Getting Started

To get started, clone this repository  to your local machine. Open the `index.html` file in a web browser to view the application. Make sure to have an internet connection to fetch the superhero data.

```
https://learn.zone01kisumu.ke/git/somulo/sortable 
```
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

## Collaboration

We welcome contributions to this project! If you have ideas, suggestions, or improvements, feel free to fork the repository and create a pull request. Please ensure that your contributions align with the project's goals and standards.

## Authors

This project was developed by:

 1: [Samuel okoth omulo](https://github.com/somulo)

 2: [Kevin Wasonga](https://github.com/kevwasonga)
 
 3: [Doreen Onyango](https://github.com/Doreen-Onyango)

## License

This project is licensed under the MIT License, allowing others to use and modify the code freely, as long as proper credit is given.