// add scripts
$(document).on('ready', function() {
  $('p').hide();
});

$("form").on("submit", function(event) {
  event.preventDefault();
  var searchTerm = $("#search-term").val().trim();
  console.log(searchTerm);
  getResults(searchTerm);
  $('p').show();
})

function getResults(searchTerm) {
  var request = $.ajax({
    //requires a url> end point, also requires method
    //to find api endpoint reference we google spotify developer and click spotify web API
    //https://developer.spotify.com/web-api/search-item/
    url: "https://api.spotify.com/v1/search",
    method: "GET",
    //https://developer.spotify.com/web-api/search-item/
    //how it will come back (look at Query parameters)
    data: {
      //required
      q: "artist:"+searchTerm,
      //required
      type: "album",
      //optional
      limit: 5
    },
    dataType: "json",
  });

  //can take any argument and it will reference the object
  request.done(function(response) {
    var albums = response.albums.items;
    var display = ""
    $.each(albums, function(i, album) {
      var albumName = album.name;
      var albumImage = album.images[0].url;
      var spotifyLink = album.external_urls.spotify;
      //don't need to put quotes around albumImage since it is coming in as a string
      display += "<li><image src=" + albumImage + "></li>";
    })
    $('.results').html(display);
    // console.log(response.albums.items);
  })
  //you can put whatever in front of .fail
  results.fail(function(error)) {
    alert("Something went wrong!");
  })

  //difference between .success or .done
};
