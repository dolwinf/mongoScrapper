$(".scrape").on("click", function(e) {
  e.preventDefault();
  console.log("clicked");
  $.get("/scrape").then(function(data) {
    console.log("Done");
    $("#news-articles").html(
      "<p>Scrape complete. Click Get DB data to retireve data from Mongo DB</p>"
    );
  });
});

$(".db").on("click", function() {
  $("#news-articles").empty();
  $.get("/articles").then(data => {
    data.forEach(item => {
      var card = `<div class="card">
      
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text"><a href='${item.link}'>${item.summary}</a></p>
        <a href="#" class="btn btn-primary">Save article</a>
      </div>
    </div>`;

      $("#news-articles").prepend(card);
    });
  });
});
