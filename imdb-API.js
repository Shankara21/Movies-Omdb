$(".input-keyword").on("change", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=77f07a9d&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCards(m);
      });
      $(".movie-container").html(cards);

      //   todo Ketika tombol Detail di klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=77f07a9d&i=" + $(this).data("id"),
          success: (m) => {
            const movies = showMoviesDetails(m);
            $(".modal-body").html(movies);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

const showCards = (m) => {
  return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button"  data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-id="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
};

const showMoviesDetails = (m) => {
  return `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${m.Poster}" alt="" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <h2>${m.Title} (${m.Year})</h2>
                                    </li>
                                    <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                                    <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                                    <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                                    <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                                    <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`;
};
