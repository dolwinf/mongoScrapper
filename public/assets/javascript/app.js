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
      var card = `<div class="card ${item._id}" >
      
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text"><a href='${item.link}'>${item.summary}</a></p>
        <a class="btn btn-primary save" id="${item._id}">Save article</a>
        <a class="btn btn-danger delete" id="${item._id}">Delete article</a>
    
      </div>
    </div>`;

      $("#news-articles").prepend(card);
      $(".delete").on("click", function(e) {
        e.preventDefault();
        var id = $(this).attr("id");
        var classID = $(this).closest(".card");
        console.log("Clicked", id);

        $.post("/delete/" + id).then(() => {
          console.log(classID);
          $(classID).remove();
        });
      });

      $(".save").on("click", function() {
        var id = $(this).attr("id");
        $.post("/saved/" + id).then(function(data) {
          console.log(data);
        });
      });
    });
  });
});

$(".sa").on("click", function(e) {
  console.log("clicked");
  $("#news-articles").empty();

  $.get("/saved").then(function(data) {
    data.forEach(item => {
      var card = `<div class="card ${item._id}" >
      
      <div class="card-body" style='margin-bottom: 5px'>
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text"><a href='${item.link}
        '>${item.summary}</a></p>
       
        
        <a class="btn btn-warning rsave" id="${item._id}">Remove from Saved</a>
        <a  class="btn btn-primary comment" id="${item._id} ">Add comment</a><br>
        <input type='text 'class='form-control acomment' id='${item._id}' style='margin-top: 10px' />
        <div id='comment-section-${item._id}' ></div><br>
        
       
      </div>
    </div>`;

      $("#news-articles").prepend(card);
    });
    $(".comment").on("click", function(e) {
      e.preventDefault();

      var id = $(this).attr("id");
      var commentVal = $(".acomment").val();

      $.post("/comment/" + id, { note: commentVal }).then(function(data) {
        console.log(data);
        $.get("/comments/" + data.notes[data.notes.length - 1]).then(function(
          data
        ) {
          $("#comment-section-" + id).prepend(
            `<br>${data.note}<button class='btn btn-sm btn-danger' id='comment-button-${id}' style='margin-left: 10px'>X</button>`
          );
          $("#acomment").val("");
          console.log("Data after posting new note", data.note);
        });

        // $(this)
        //   .closest("#note")
        //   .prepend(`<br>${data.note}`);
      });
    });
    $(".rsave").on("click", function() {
      var id = $(this).attr("id");
      var classID = $(this).closest(".card");
      $.post("/removesaved/" + id).then(function() {
        $(classID).remove();
      });
    });
  });
});
