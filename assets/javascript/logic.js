// Thanks to Jonathan Barceló for his help on this homework!

$(document).ready(function() {

    // This array contains all the default topics and will contain future ones.
    var topics = ["obi-wan", "luke skywalker", "darth vader", "rey", "kylo ren"];

    // This calls the createButtons function as soon as the page loads.
    createButtons();

    // EVENT LISTENERS

    // When the "Add!" button is clicked...
    $("#add-category").on("click", function(event) {

        // ...the page won't reload...
        event.preventDefault();
        // ...a new variable stores the submitted value...
        var newCategory = $("#category-input").val().trim();
        //...the new variable is pushed to the array containing the topics...
        topics.push(newCategory);
        //...and the buttons are created again.
        createButtons();
    
    })
    
    // When a button is clicked, the showGif function is called.
    $(document).on("click", ".button", showGif);

    // When a gif is clicked, it is either paused or played.
    $(document).on("click", ".gif", function() {
        // First, the current state is stored inside a variable.
        var state = $(this).attr("data-state");
        // If the state is "still"...
        if (state === "still") {
            // ...change the source to the animated url...
            $(this).attr("src", $(this).attr("data-animate"));
            // ...and change the state to "animate".
            $(this).attr("data-state", "animate");
        }
        // If the state is "animate"...
        if (state === "animate") {
            // ...change the source to the still url...
            $(this).attr("src", $(this).attr("data-still"));
            // ...and change the state to "still".
            $(this).attr("data-state", "still");
        }
    });

    // FUNCTIONS

    // This function creates the buttons.
    function createButtons() {
        // The button container is cleared so that the buttons don't stack every time the function is called.
        $("#buttons-container").empty();
        // The for loop goes through all the strings inside the topics array.
        for (var i = 0; i < topics.length; i++) {
            // JQuery dinamically creates new buttons.
            var button = $("<button>");
            // The new buttons get the class "button".
            button.attr("class", "button");
            // If the strings inside the topics array have dashes, they are replaced with spaces.
            topics[i] = topics[i].replace(/-/g, ' ');
            // The new buttons get individual texts matching their strings.
            button.text(topics[i].toLowerCase());
            // If the strings inside the topics array have spaces, they are replaced with dashes. This is needed so that the query URL doesn't break.
            topics[i] = topics[i].replace(/ /g, '-');
            // The new buttons get individual ids matching their strings.
            button.attr("id", topics[i]);
            // The buttons are appended to the button-container div.
            $("#buttons-container").append(button);
        }
    }

    // This function shows the gifs.
    function showGif() {
        // A new variable is created, matching the id of the pressed button.
        var newCategory = $(this).attr("id");
        // This variable contains my personal API Key, provided by GIPHY.
        var apiKey = "2Qh6FOtZdtxhTiBuIk5L5j7Tme5fGue8";
        // The query URL is created dinamically. The chosen parameters are: q (search term), limit (amount of gifs) and rating (all G).
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newCategory.toLowerCase() + "&api_key=" + apiKey + "&limit=10&rating=g";
        // The query URL is then logged into the console. Useful for debugging.
        console.log("Query URL: " + queryURL);
        // AJAX makes the request to the API.
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // We log the response into the console. Useful for debugging.
            console.log(response);
            // We clear the div containing the gifs so that the new ones don't stack.
            $("#gifs-box").empty();
            // We store the relevant data inside a new variable for clarity and brevity.
            var results = response.data;
            // We loop through all the images in the array.
            for (var i = 0; i < results.length; i++) {
                // We create new divs for each new gif.
                var gifDiv = $("<div>");
                // We create new paragraphs showcasing the ratings of the gifs.
                var rating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                // We create new image elements for each gif.
                var newGifs = $("<img>");
                // We set the source for each gif using dot notation.
                newGifs.attr("src", results[i].images.original_still.url);
                // We define the default state of the gif as "still".
                newGifs.attr("data-state", "still")
                // We define the animated url of the gif inside of an attribute.
                newGifs.attr("data-animate", results[i].images.original.url)
                // We define the still url of the gif inside of an attribute.
                newGifs.attr("data-still", results[i].images.original_still.url)
                // We give the class "gif" to every new gif. Useful later on.
                newGifs.attr("class", "gif");
                // We set some attributes that control the size of the gifs so they look nicer.
                newGifs.attr("width", "400px");
                newGifs.attr("height", "auto");
                // We append the paragraphs with the ratings to the new divs.
                gifDiv.append(rating);
                // We append a line break to the new divs.
                gifDiv.append("<br>");
                // We append the gifs to the new divs.
                gifDiv.append(newGifs);
                // We append some additional line breaks to the new divs.
                gifDiv.append("<br>");
                gifDiv.append("<br>");
                // We append the new divs to the HTML div where they belong.
                $("#gifs-box").append(gifDiv);
            }
        });
    }

});