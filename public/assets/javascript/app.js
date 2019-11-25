$(".scrape").on("click", function(e) {
  e.preventDefault();
  console.log("clicked");
  $.get("/scrape").then(function(data) {
    console.log(data);
  });
});
