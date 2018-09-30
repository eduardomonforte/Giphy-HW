// Thanks to Jonathan Barceló for his help on this homework!

$(document).ready(function() {

    // This array contains all default categories and will contain future ones.
    var categories = ["obi-wan", "luke", "vader", "rey", "kylo"]

    // This calls the createButtons function as soon as the page loads.
    createButtons();

    // EVENT LISTENERS

    // When the Add! button is clicked...
    $("#add-category").on("click", function(event) {

        // ...the page won't reload...
        event.preventDefault();
        // ...a new variable stores the submitted value...
        var newCategory = $("#category-input").val().trim();
        //...the new variable is pushed to the array containing the categories...
        categories.push(newCategory);
        //...and the buttons are created again.
        createButtons();
    
    })
    
    // When a button is clicked, the showGif function is called.
    $(document).on("click", ".button" , showGif);

    // FUNCTIONS

    // This functions creates the buttons.
    function createButtons() {
        // The button container is cleared so that the buttons don't stack everytime the function is called.
        $("#buttons-container").empty();
        // The for loop goes through all the strings inside the categories array.
        for (var i = 0; i < categories.length; i++) {
            // JQuery dinamically creates a button.
            var button = $("<button>");
            // The new buttons gets the class "button".
            button.attr("class", "button")
            // The new buttons get specific ids matching their strings.
            button.attr("id", categories[i]);
            // The buttons get specific texts matching their strings.
            button.text(categories[i].toLowerCase());
            // The buttons are appended to the button-container div.
            $("#buttons-container").append(button);
        }
    }

    // This function shows the gifs.
    function showGif() {
        // A new variable is created, matching the id of the pressed button.
        var newCategory = $(this).attr("id");
        // This variable contains my personal API Key, provided by GIPHY.
        var apiKey = "2Qh6FOtZdtxhTiBuIk5L5j7Tme5fGue8"
        // The query URL is created dinamically. The chosen parameters are: q (search term), limit (amount of gifs) and rating (all G).
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newCategory.toLowerCase() + "&api_key=" + apiKey + "&limit=10&rating=g";
        // The query URL is then logged into the console. Useful for debugging.
        console.log("Query URL: " + queryURL);
        // AJAX makes the request to the API.
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // The response to the request is logged into the console. Useful for debugging.
            console.log(response);
            // We clear the div containing the gifs so the new ones don't stack.
            $("#gifs-box").empty();
            // We store the relevant data into a new variable for clarity and brevity.
            var results = response.data;
            // We loop through all the images in the array.
            for (var i = 0; i < results.length; i++) {
                // We create new divs for each new gif.
                var gifDiv = $("<div>");
                // We create new paragraphs showcasing the rating for the gifs.
                var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                // We create a new line break so it looks nicer.
                var lineBreak = $("<br>");
                // We create new image elements for each gif.
                var newGifs = $("<img>");
                // We set the source for each gif using dot notation.
                newGifs.attr("src", results[i].images.fixed_height.url);
                // We set some attributes that control the size of the gifs so they look nicer.
                newGifs.attr("width", "400px");
                newGifs.attr("height", "auto");
                // We append the paragraph with the rating to the new divs.
                gifDiv.append(p);
                // We append the line break to the new divs.
                gifDiv.append(lineBreak);
                // We append the gifs to the new divs.
                gifDiv.append(newGifs);
                // We prepend the new divs to the HTML div where they belong.
                $("#gifs-box").prepend(gifDiv);
            }
        });
    }

});