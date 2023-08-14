/*this function lets us click and shuffle through the pile of recipe cards
and starts again when reaches the end of the pile
based on the code i found at  https://www.hungred.com/how-to/tutorial-shuffle-effect-jquery/
the code was using jQuery UI for an Easing function but i have replaced that with "swing" animation for simplicity.
i am please wth the result but it took a lot of trial and error to get the cards in the container and to be satisifed with the sizing.
I learned about the z index and how that can be manipulated.
useful to see css being referenced in the form $this.css.
the code for left 30% and left 100% feels like it could be improved upon
*/


$(function(){
    var i = 0;
    $("div.card").click(function(){
        var $this = $(this);
        
        // First animation: move the card further to the right and upward
        $this.animate({
            left: "100%",
            marginTop: "-5em"
        }, 300, "swing", function() {
            i--;
            $this.css("z-index", i);

            // Reset the card's position and place it under the stack
            $this.css({
                left: "30%",  
                marginTop: "0em"
            });
        });
    });
});

  