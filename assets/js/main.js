key = "7052b4d45a30f76d9eff0ea2aee88495";
const MovieRecommonded = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&vote_average.gte=8`
const MoviePopular = `https:///api.themoviedb.org/3/movie/popular?api_key=${key}`
const MovieGenreFamilly = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&with_genres= 10751`
const MovieGenreAction = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&with_genres= 36`





function get_movie(data, movie_class) {
    let popular_movie = document.querySelector("." + movie_class)
    for (let i = 0; i < 14; i++) {
        let MovieId = data.results[i].id
        let VoteAverage = data.results[i].vote_average;
        if (Number.isInteger(VoteAverage)) {
            VoteAverage += '.0';
        }
        popular_movie.innerHTML += `
            <a href='movie.html?id=${MovieId}&movie=${data.results[i].title}' class="movie" >
            <span  class="fa fa-star checked"><i>${VoteAverage }</i></span>
            <img src="http://image.tmdb.org/t/p/w342/${data.results[i].poster_path}">
                <h3>${data.results[i].title}</h3>
                <p>${data.results[i].release_date}</p>
            <a>`
    }
}

function fetch_movie(fetch_movie, movie_class) {
    fetch(fetch_movie)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            get_movie(data, movie_class);
        })
}


fetch_movie(MovieRecommonded, "recommended_movie");
fetch_movie(MoviePopular, "popular_movie");
fetch_movie(MovieGenreFamilly, "genre_drama_movie");
fetch_movie(MovieGenreAction, "genre_action_movie");



//// saerching

let search = document.querySelector('.search');

search.addEventListener('keyup', () => {
    let search_value = document.querySelector('.search').value;
    const MovieName = `http://api.themoviedb.org/3/search/movie?api_key=${key}&query=${search_value}`

    async function getMovie() {
        const response = await fetch(MovieName)
        const data = await response.json();
        let all_movie = data.results.length;
        let dataMoovie = document.querySelector('#mysearch')
        dataMoovie.innerHTML = "";
        if (all_movie == 0) {
            document.querySelector('.notfound ').style = 'display:block'
        } else if (search_value == "") {
            document.querySelector('.notfound ').style = 'display:none'
        } else {
            for (let i = 0; i < 5; i++) {
                dataMoovie.innerHTML += `<option value='${data.results[i].title}'>`
                document.querySelector('.notfound ').style = 'display:none'
                    // console.log(data.results[i].title)
            }
        }

    }
    getMovie();
})

function myFunction(event) {
    if (event.keyCode == 13) {
        let search_value = document.querySelector('.search').value;
        const ApiMovies = `http://api.themoviedb.org/3/search/movie?api_key=7052b4d45a30f76d9eff0ea2aee88495&query= ${search_value}`;

        fetch(ApiMovies)
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                let MovieId = data.results[0].id
                console.log(MovieId)
                window.location.href = `movie.html?id=${MovieId}`;


            })
    }

}