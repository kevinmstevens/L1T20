/*PSEUDO CODE
Clicking the save button saves the recipeName by passing it to the saveRecipe function.
The save-for-later table is then generated.
*/
// Each save button has a class "save-button" and each recipe has an id
document.querySelectorAll(".save-button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    /*for debugging.  The parent node of the save button is card-body 
        let parent=button.parentNode;
        alert(parent.className)
        */
    let recipeName = event.target.parentNode.id; // The id of the parent needs to be the recipe name
    saveRecipe(recipeName);
    generateTable();
  });
});

/*PSEUDO CODE
Simple code to display an alert whenever the like button is clicked.

*/
document.querySelectorAll(".like-button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    alert("You liked this!");
  });
});

/*PSEUDOCODE
Gets the recipe name from the event listener on the save button (code above).
Gets the current list of saved recipes from local storage using JSON.parse.
I've learned about 'truthy' and 'falsy'.   https://salferrarello.com/javascript-or-versus-nullish-coalescing-operator/
If savedRecipes does not exist in local storage then a null value will be returned by JSON.parse, this is harmless
Check if the recipe is already in savedRecipes - do not add it again.  If it's not there, push it into the array.
Saved the updated list into local storage using JSON.stringify.
Get the length of the area and display it in an alert.

Note this approach saves the recipes into one array, this is simple.  It could be possible to save each recipe as a key/ value pair - see https://forum.freecodecamp.org/t/how-to-store-dynamically-generated-list-items-in-localstorage-individually-so-each-with-their-own-key/299602
*/
function saveRecipe(recipeName) {
  // Get the current list of saved recipes
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || []; // [] is the default value by || operator

  // Check if the recipe is already in the list
  if (savedRecipes.includes(recipeName)) {
    alert("This recipe is already saved: " + recipeName);
  } else {
    // Add the new recipe to the list
    savedRecipes.push(recipeName);

    // Save the updated list
    myArray = JSON.stringify(savedRecipes);
    localStorage.setItem("savedRecipes", myArray);

    // Get the length of the array see https://stackoverflow.com/questions/20841030/javascript-count-number-of-key-values-inside-stringified-json-object
    numberOfRecipes = savedRecipes.length;
    // Alert the user
    alert(
      "Saved recipe: " +
        recipeName +
        ". You have " +
        numberOfRecipes +
        " in your list."
    );
  }
}

// we could consider clearing out the local storage when the browser is closed.

//prettier: cmd+shift+P
//i found the following reference useful to learn about relevant concepts although they're not using json https://www.codewithfaraz.com/content/165/create-dynamic-html-table-using-html-css-and-javascript

/*FUNCTION TO POST COMMENT TO LOCAL STORAGE
PSEUDOCODE
When the submit button is pressed, the value of the textarea in the comments box is saved in variable comment.
We add this to the existing comments in local storage, get these using json.parse.  If there's no comments this is handled harmlessly by || falsy operator to initialise a empty array. 
push the comment into the comments array and use stringify to saved the comments back into local storage.
Clear the text area and display an alert to inform the user.  I am printing all the comments in the alert to prove this has worked!
*/
$(document).ready(function () {
  $("#commentForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission otherwise it will submit?
    let comment = $("#comment").val(); // Get the comment from the textarea

    // Retrieve the existing comments from local storage, or initialise a new empty array
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Add the new comment to the array
    comments.push(comment);

    // Store the updated comments array back in local storage
    localStorage.setItem("comments", JSON.stringify(comments));

    // Clear the textarea
    $("#comment").val("");

    // Inform the user
    alert("Comment saved! The comments in LocalStorage are:" + comments);
  });
});

/* GENERATE THE DYNAMIC TABLE

PSEUSDOCODE
I am reusing the generateTable() code i wrote for LT18 (Book Collection).
When the recipe is saved, the recipe is added to the localStorage.  
Then the save-for-later.html will access the localStorage,
and dynamically update the table with the recipe name.
Note that whenever the save-for-later.html page is activated, we need to refresh the table.

I learned that this script should only be on the recipes page, otherwise an error is generated when the script runs but there is no savedRecipesTableBody page.  But i put in an error handler too.
*/

let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

/*reusing code from LT18.  I have added code to check if there's no table - then do nothing, otherwise an error is generated (though the 
error didn't affect functionality, isn't it better to avoid errors */
function generateTable() {
  let tableBody = document.getElementById("savedRecipesTableBody");

  if (!tableBody) {
    return; //exit if there is no tableBody on the page
  }
  tableBody.innerHTML = "";
  savedRecipes.forEach(function (recipeName, index) {
    let row = tableBody.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.textContent = recipeName;

    let deleteCell = row.insertCell(-1);
    let deleteButton = document.createElement("span");
    deleteButton.innerHTML = "\u{1F5D1}";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function () {
      deleteRecipe(index);
    };
    deleteCell.appendChild(deleteButton);
  });
}

function deleteRecipe(index) {
  savedRecipes.splice(index, 1);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  generateTable();
}

// Generate the table when the page loads
generateTable();

// Update the table whenever localStorage changes
/*PSEUDOCODE
ADD an event listener on the local storage. We only listen for changes as a result of savedRecipes changing, as there could be other reasons why
local storage has changed.  
If local storage has changed due to recipes being added or deleted, then we update the table with the savedRecipes.  savedRecipes is all the recipes.
see https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event 

*/
window.addEventListener("storage", function (event) {
  if (event.key === "savedRecipes") {
    savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || []; //if there's nothing, use falsy || to return empty array, harmless
    generateTable();
  }
});
