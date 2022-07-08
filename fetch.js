const search = document.querySelector(".input-keyword");

search.addEventListener("change", function () {
  fetch("http://www.omdbapi.com/?apikey=77f07a9d&s=" + search.value)
    // todo Then yang pertama nantinya akan menghasilkan sebuah promise sehingga perlu adanya then lagi
    .then((res) =>
      res
        .json()
        // todo Then yang ini akan memberikan hasil yang diinginkan bisa array, object, array of object
        .then((res) => {
          const movies = res.Search;
          let cards = "";
          movies.forEach((m) => (cards += showCards(m)));
          const movieContainer = document.querySelector(".movie-container");
          movieContainer.innerHTML = cards;

          // ! Ketika tombol detail di klik
          const modalDetail = document.querySelectorAll(".modal-detail-button");
          modalDetail.forEach((btn) => {
            btn.addEventListener("click", function () {
              const id = this.dataset.id;
              fetch("http://www.omdbapi.com/?apikey=77f07a9d&i=" + id)
                .then((response) => response.json())
                .then((m) => {
                  const movieDetail = showMoviesDetails(m);
                  const modalBody = document.querySelector(".modal-body");
                  modalBody.innerHTML = movieDetail;
                });
            });
          });
        })
    );
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
