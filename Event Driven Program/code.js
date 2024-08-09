// Class to manage a Recipe object
class Recipe {
    constructor(name) {
        this.name = name; // Store the recipe name
        this.items = {};  // Initialize an empty object to store ingredients
        this.createList(); // Initialize the table list
    }

    // Method to create and update the ingredient list in the table
    createList() {
        document.getElementById('recipeName').innerHTML = this.name; // Display the recipe name above the table
        const table = document.getElementById('recipeTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear any existing rows

        // Loop through items, create a row for each ingredient to include a checkbox, ingredient name, and amount cell
        for (let ingredient in this.items) {
            const row = document.createElement('tr');

            // Create checkbox cell
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            // Create ingredient cell
            const ingredientCell = document.createElement('td');
            ingredientCell.innerHTML = ingredient;
            row.appendChild(ingredientCell);

            // Create amount cell
            const amountCell = document.createElement('td');
            amountCell.innerHTML = this.items[ingredient];
            row.appendChild(amountCell);

            // Append the row to the table body
            table.appendChild(row);
        }
    }

    // Method to add a new item to the recipe
    addItem() {
        const ingredient = prompt('Please enter the ingredient:'); // Prompt user for ingredient
        if (ingredient !== null) {
            const amount = prompt('Please enter the amount:'); // Prompt user for amount
            if (amount !== null) {
                this.items[ingredient] = amount; // Add item to the list
                this.updateList(); // Update the table
            } else {
                alert('No amount provided'); // Alert if no amount is entered
            }
        } else {
            alert('No ingredient provided'); // Alert if no ingredient is entered
        }
    }

    // Method to remove selected items from the recipe
    removeItem() {
        const table = document.getElementById('recipeBody');
        const rows = table.getElementsByTagName('tr'); // A list containing all of the rows within the table body
        // Loop through rows in reverse order to safely remove selected rows
        for (let i = rows.length - 1; i >= 0; i--) {
            const checkbox = rows[i].getElementsByTagName('input')[0];
            if (checkbox.checked) {
                const ingredient = rows[i].getElementsByTagName('td')[1].innerHTML;
                delete this.items[ingredient]; // Remove the item from the list
            }
        }
        this.updateList(); // Update the table
    }

    // Method to refresh the table after adding/removing items
    updateList() {
        this.createList(); // Recreate the table with the updated items
    }
}

// Function to select or deselect all checkboxes in the table
const selectAll = (selectAllCheckbox) => {
    const table = document.getElementById('recipeBody'); // Get the table body
    const checkboxes = table.getElementsByTagName('input'); // Get all input elements in the table
    // Loop through checkboxes and set them based on the select-all checkbox state
    for (let checkbox of checkboxes) {
        checkbox.checked = selectAllCheckbox.checked; // Set checkbox state
    }
}

// Function to create the table header
const createHeader = () => {
    const header = document.getElementById('recipeHead'); // Get the table head element
    header.innerHTML = ''; // Clear any existing header

    const headerRow = document.createElement('tr'); // Create a new table row

    // Create select-all checkbox in the header
    const selectAllCheckbox = document.createElement('input'); // Create the select-all checkbox
    selectAllCheckbox.type = 'checkbox'; // Set the checkbox type
    // Add event listener to call selectAll() when checkbox is clicked
    selectAllCheckbox.addEventListener('change', () => selectAll(selectAllCheckbox));

    // Create select-all header cell
    const selectAllCell = document.createElement('th'); // Create a new table header cell
    selectAllCell.appendChild(selectAllCheckbox); // Append checkbox to the header cell

    // Create ingredient header cell
    const label1 = document.createElement('th');
    label1.innerHTML = 'Ingredient';

    // Create amount header cell
    const label2 = document.createElement('th');
    label2.innerHTML = 'Amount';

    // Append cells to header row
    for (let cell of [selectAllCell, label1, label2]) {
        headerRow.appendChild(cell);
    }

    // Append the header row to the table head
    header.appendChild(headerRow);
}


// Array to store all recipes created.
// This is to allow for saving recipes for later editing. I do not yet have that functionality included.
const recipes = [];

// Function to handle form submission
const submit = (event) => {
    event.preventDefault(); // Prevent default form submission
    document.getElementById('recipeForm').style.display = 'none'; // Hide the form after submission
    createHeader(); // Create table header

    // Get the recipe name from the input field
    const name = document.getElementById('recipe').value;
    const recipe = new Recipe(name); // Create a new Recipe object
    recipes.push(recipe); // Add recipe to the array

    // Create and append Add Ingredient button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Ingredient';
    addButton.addEventListener('click', () => recipe.addItem());

    // Create and append Remove Selected Ingredients button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Selected Ingredients';
    removeButton.addEventListener('click', () => recipe.removeItem());

    // Append buttons to the buttonDiv
    const buttonDiv = document.getElementById('buttonDiv');
    buttonDiv.appendChild(addButton);
    buttonDiv.appendChild(removeButton);
}

// Add event listener to handle form submission
document.getElementById('recipeForm').addEventListener('submit', submit);
