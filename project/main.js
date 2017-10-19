$("#form-submit").click(function(event) {
  event.preventDefault();
  var formName = $("#form-name").val();
  var formEmail = $("#form-email").val();
  var formComments = $("#form-comments").val();
  console.log("Form Name: ", formName);
  console.log("Form Email: ", formEmail);
  console.log("Form Comments: ", formComments);

  $("#message-output").html(formName + ", thanks for reaching out!");
})



var placeNames = ["Motherboy XXX", "A Boat", "The Hospital", "Jail", "The Moon", "The Ocean"];
var placeImages = ["http://vignette1.wikia.nocookie.net/arresteddevelopment/images/0/05/2x13_Motherboy_XXX_%2807%29.png/revision/latest?cb=20130123234626", "https://s-media-cache-ak0.pinimg.com/736x/77/47/1d/77471d782bccd069dd70a05b879471b0.jpg", "https://vignette3.wikia.nocookie.net/arresteddevelopment/images/1/18/3x12_Exit_Strategy_%2819%29.png", "https://i.ytimg.com/vi/bAFnH4X9dXQ/mqdefault.jpg", "http://www.sciencemag.org/sites/default/files/styles/article_main_large/public/images/cc_footprint_16x9.jpg?itok=nYjs99ld", "http://vignette3.wikia.nocookie.net/arresteddevelopment/images/e/e4/3x13_Development_Arrested_%2893%29.png/revision/latest?cb=20130323224933"];
var haveIBeenThere = [true, true, true, true, false, true];

function printCards() {
  var domString = "";
  for (var i = 0; i < placeNames.length; i++) {
    domString += '<div class="card places-card">';
    domString +=   '<div class="image-container">';
    domString +=     '<img src="' + placeImages[i] + '">';
    domString +=   '</div>';
    domString +=     '<div class="description-container">';
    domString +=        '<h3 class="place-title">' + placeNames[i] + '</h3>';
    if (haveIBeenThere[i]) {
      domString +=      '<p class="been-there">Been there!</p>';
    } else {
      domString +=      '<p class="been-there">Want to go there!</p>';
    }
    domString +=     '</div>';
    domString +=   '</div>';
    domString += '</div>';
  }

  $("#place-card-holder").append(domString);
}

printCards();



$("#search-places").on("submit", function (e) {
  e.preventDefault();

  reset();

  $(".places-card").each(function(card) {
    var currentCard = $(".places-card")[card];

    filterCardsForBeenThere(currentCard);
    filterCardsForSearchPhrase(currentCard);
  })
  $("#place-card-holder").fadeOut(0);
  $("#place-card-holder").fadeIn(500);
})


function filterCardsForBeenThere (currentCard) {
  var beenThereFromSearch = $("input[name=been-there]:checked").val();

  var beenThereValue = $(currentCard).find(".been-there").html();
  var beenThereBooleanValue;
  if (beenThereValue === "Been there!") {
    beenThereBooleanValue = true;
  } else {
    beenThereBooleanValue = false;
  }

  if ((!(beenThereBooleanValue.toString() == beenThereFromSearch)) && beenThereFromSearch) {
    $(currentCard).hide()
  }
}

function filterCardsForSearchPhrase (currentCard) {
  var searchValue = $("#search-field").val().toLowerCase();

  if (!($(currentCard).find(".place-title").html().toLowerCase().includes(searchValue))) {
    $(currentCard).hide()
  }
}

function reset() {
  $(".places-card").each(function(card) {
    $($(".places-card")[card]).show()
  })
}
