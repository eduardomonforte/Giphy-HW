console.log("I'm linked!")

$(document).ready(function() {

    // This array contains all default categories and will contain future ones.
    var categories = ["obi-wan", "luke", "darth vader", "rey", "kylo ren"]

    // This variable points to the value submitted on the form.
    var newCategory = "placeholder"
    // $("#category-input").val().trim()

    // My Person API Key provided by GIPHY
    var apiKey = "2Qh6FOtZdtxhTiBuIk5L5j7Tme5fGue8"
    console.log("API Key: " + apiKey);

    // This URL specifies the parameters included in the request.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newCategory.toLowerCase() + "&api_key=" + apiKey + "&limit=10&rating=g";
    console.log("Query URL: " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    createButtons();

    function createButtons() {
        $("#buttons-container").empty();

        for (var i = 0; i < categories.length; i++) {
            var button = $("<button>");
            button.attr("id", categories[i]);
            button.text(categories[i].toLowerCase());
            $("#buttons-container").append(button);
        }
    }

    // Event Listeners

    $("#add-category").on("click", function(event) {

        event.preventDefault();

        var newCategory = $("#category-input").val().trim();
        categories.push(newCategory);
        createButtons();

    })

});