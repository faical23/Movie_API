let url_str = window.location.href;
let url = new URL(url_str);
let MovieId = url.searchParams.get('id');


key = "7052b4d45a30f76d9eff0ea2aee88495";

const MovieData = `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${key}&language=en-US`

fetch(MovieData)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
        document.querySelector('.Moviename').innerHTML = data.title
        document.querySelector('.date').innerHTML = data.release_date
        document.querySelector('.vote_average').innerHTML = data.vote_average
        document.querySelector('.overview').innerHTML = data.overview
        document.querySelector('.post_path').src = `http://image.tmdb.org/t/p/w342/${data.poster_path}`
        let genre_length = data.genres.length;
        for (let i = 0; i < genre_length; i++) {
            document.querySelector('.genre').innerHTML += `<p> . ${data.genres[i].name}</p>`
        }
        let time_h = parseInt(data.runtime / 60)
        let time_m = parseInt(data.runtime % 60)
        document.querySelector('.time').innerHTML = time_h + "h " + time_m + "m"
    })

const MovieVideo = `https://api.themoviedb.org/3/movie/${MovieId}/videos?api_key=${key}&language=en-US`
fetch(MovieVideo)
    .then(response => {
        return response.json();
    })

.then((data) => {
    let path_video = data.results[0].key;
    let video = document.querySelector('iframe')
    video.src = `https://www.youtube.com/embed/${path_video}?controls=0`

})
const MovieImg = `https://api.themoviedb.org/3/movie/${MovieId}/images?api_key=${key}`
fetch(MovieImg)
    .then(response => {
        return response.json();
    })

.then((data) => {
    console.log(data)
    let Img = data.backdrops.length
    console.log(Img)
    let all_img = document.querySelectorAll('.img_movie');
    var i = 0;
    all_img.forEach(Element => {
        Element.src = "http://image.tmdb.org/t/p/w342/" + data.backdrops[i].file_path;
        i++;
    })
})