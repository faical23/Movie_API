key = "7052b4d45a30f76d9eff0ea2aee88495"
const category = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`

fetch(category)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        let genre = data.genres.length;
        let side_bare = document.querySelector('.side_bare')
        for (let i = 0; i < genre; i++) {
            side_bare.innerHTML += `<span onclick ="switch_movies(${data.genres[i].id})">${data.genres[i].name}</span>`
            console.log(data.genres[i].name)
        }
    })

function get_movie_genre(id) {
    const GenreMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${id}`
    fetch(GenreMovie)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            let all_movie_length = data.results.length
            let zone_movie = document.querySelector('.films_by_category .row')
            zone_movie.innerHTML = "";

            console.log(zone_movie)
            for (let i = 0; i < all_movie_length; i++) {
                console.log(data.results[i].title)
                let VoteAverage = data.results[i].vote_average;
                let MovieId = data.results[i].id
                if (Number.isInteger(VoteAverage)) {
                    VoteAverage += '.0';
                }
                zone_movie.innerHTML += `
     <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-3">
        <a href='movie.html?id=${MovieId}&movie=${data.results[i].title}' class="movie" >
            <span class="fa fa-star checked"><i>${VoteAverage }</i></span>
            <img src="http://image.tmdb.org/t/p/w342${data.results[i].poster_path}">
            <h3>${data.results[i].title}</h3>
            <p>${data.results[i].release_date}</p>
        </a>
    </div>`
            }
        })
}

get_movie_genre("28");

const switch_movies = (id) => {
    get_movie_genre(id);

}