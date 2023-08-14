/*README
The following jQuery functionality is implemented:
i. A function which contains hiding / showing - see recipes.html, the button hides and shows the recipes.
ii. A drop down menu - i've extended the nav bar - see Recipes (new).
iii. Animation effects - I've added glowing effects - see navbar, the small print animation on recipes.html.  I've also done a recipe card shuffler.
iv. A function with chained effects - the small print animation uses chained classes.

/* KEEPING ANIMATIONS IN A SEPERATE SCRIPT
 */

// SIMPLE FADE-TOGGLER
$(document).ready(function () {
  $("#btn-fadeToggler").on("click", function () {
    $(".fadeToggler").fadeToggle(1000);
  });
});

//OLD CODE - SMALL PRINT EXPANDER
// old code ... instead of all this code we can just toggle the classes!!! But it was good to learn about keeping track of the state
// and manipulating that.
//   $('.enlargeable').on('click', function() {
//     let $this = $(this);  // cache the jQuery object

//     if ($this.data('enlarged')) {  // check if the element is already enlarged
//         // If enlarged, reset to the original state
//         $this
//             .animate({width: "10%"})  // assuming original width was "auto"
//             .animate({fontSize: $recipe-font})  // reset font size
//             .animate({borderWidth: 1})  // reset border width
//             .data('enlarged', false);  // set the state as not enlarged
//     } else {
//         // If not enlarged, enlarge the element
//         $this
//             .animate({width: "100%"})
//             .animate({fontSize: "46px"})
//             .animate({borderWidth: 30})
//             .data('enlarged', true);  // set the state as enlarged
//     }
// });

/*SMALL PRINT EXPANDER
FUNCTION WITH CHAINED EFFECT:
PSEUDOCODE

Toggle the classes to make the size bigger, and back again.  Uses chaining method, chains enlarged onto enlargeable, see the SCSS. this is much simpler.
*/
$(".enlargeable").on("click", function () {
  $(this).toggleClass("enlarged");
});
