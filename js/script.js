const MAX_MOVIES_BY_CATEGORIES = 7;
const MAX_MOVIE_BY_PAGE = 5;
const MAX_PAGE = Math.ceil(MAX_MOVIES_BY_CATEGORIES / MAX_MOVIE_BY_PAGE);

const modal_window = document.getElementById("modal_window");
const modal_content = document.getElementById("modal_content");

const CAT_1 = "Adventure"
const CAT_2 = "Thriller"
const CAT_3 = "Drama"

async function getResults(url, allResults = [], currentPage = 0) {

    // Effectuer une requête HTTP pour obtenir la page actuelle
    const response = await fetch(url);
    const data = await response.json();

    // Ajouter les résultats de la page actuelle au tableau global
    allResults = allResults.concat(data.results);
    currentPage++;

    // Si il y a une page suivante et que le nombre de page maximum n'est pas atteint
    if (data.next && currentPage < MAX_PAGE) {
        return await getResults(data.next, allResults, currentPage);
    }else{
        return allResults;
    }
}

async function get_best_movie(){
    const best_movie = get_top_rate_movies()
    .then((result) => {
        return [result[0]];
    });

    return await best_movie;
}

async function get_top_rate_movies(){    
    return getResults("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,votes")
}

function get_category_1_movies(){
    return getResults("http://localhost:8000/api/v1/titles/?genre=" + CAT_1 + "&sort_by=-imdb_score");
}

function get_category_2_movies(){
    return getResults("http://localhost:8000/api/v1/titles/?genre=" + CAT_2 + "&sort_by=-imdb_score");
}

function get_category_3_movies(){
    return getResults("http://localhost:8000/api/v1/titles/?genre=" + CAT_3 + "&sort_by=-imdb_score");
}

function display_movie_details(movie_id){

    fetch("http://localhost:8000/api/v1/titles/" + movie_id)
    .then((response) => response.json())
    .then((data) => {

        // display the modal window
        modal_window.style.display = "flex";

        // clear all the content of the modal window
        modal_content.innerHTML = "";

        // add the img of the movie
        var movie_img = document.createElement("img");
        movie_img.src = data.image_url;        
        modal_content.appendChild(movie_img);

        // add the title of the movie
        var title_span = document.createElement("p");
        title_span.innerHTML = "Titre : " + data.original_title;
        modal_content.appendChild(title_span);

        // add the genres of the movie
        var genres_span = document.createElement("p");
        genres_span.innerHTML = "Genres : " + data.genres;
        modal_content.appendChild(genres_span);

        // add the release date
        var release_date = document.createElement("p");
        release_date.innerHTML = "Date de sortie : " + data.date_published;
        modal_content.appendChild(release_date);

        // add the rate
        var rate_span = document.createElement("p");
        rate_span.innerHTML = "Rated : " + data.rated;
        modal_content.appendChild(rate_span);

        // add the imdb score
        var imdb_score = document.createElement("p");
        imdb_score.innerHTML = "Score imdb : " + data.imdb_score;
        modal_content.appendChild(imdb_score);

        // add the directors
        var directors = document.createElement("p");
        directors.innerHTML = "Réalisateurs : " + data.directors;
        modal_content.appendChild(directors);

        // add the actors
        var actors = document.createElement("p");
        actors.innerHTML = "Acteurs : " + data.actors;
        modal_content.appendChild(actors);

        // add the duration
        var duration = document.createElement("p");
        var duration_value = data.duration;
        var hours = Math.floor(duration_value / 60);
        var minutes = duration_value % 60;
        duration.innerHTML = "Durée : " + hours + "h" + (minutes > 0 ? minutes.toString().padStart(2, 0) : "");
        modal_content.appendChild(duration);

        // add the countries
        var countries = document.createElement("p");
        countries.innerHTML = "Countries : " + data.countries;
        modal_content.appendChild(countries);

        // add the synopsis
        var synopsis = document.createElement("p");
        synopsis.innerHTML = "Résumé : " + data.long_description;
        modal_content.appendChild(synopsis);        
    });
}

function display_categorie(results, class_id){

    results.then((top_rate_movies) => {

        const parent_div = document.getElementById(class_id);

        for(let i = 0; i < Math.min(top_rate_movies.length, MAX_MOVIES_BY_CATEGORIES); i++){       

            let current_movie = top_rate_movies[i];
            var movie_id = class_id + "_" + i;

            // create the movie container
            var movie_div = document.createElement("div");
            movie_div.classList.add("movie");
            
            // create the img element, containing the image of the current movie
            var movie_img = document.createElement("img");
            movie_img.src = current_movie.image_url;
            movie_img.id = movie_id;

            // append the div element to the parent div
            parent_div.appendChild(movie_div);             
            
            // append the img element to the div element
            movie_div.appendChild(movie_img);

            // attach the click event to the img element
            movie_img.addEventListener('click', (e) => {
                display_movie_details(current_movie.id);
            });
        }

        try {
            // add the left scroll button event on the parent div 
            parent_div.getElementsByClassName("slide_left")[0].addEventListener('click', (e) => {
                parent_div.scrollLeft += parent_div.clientWidth / MAX_MOVIES_BY_CATEGORIES
            });

            // add the right scroll button event on the parent div
            parent_div.getElementsByClassName("slide_right")[0].addEventListener('click', (e) => {
                parent_div.scrollLeft -= parent_div.clientWidth / MAX_MOVIES_BY_CATEGORIES
            });

        }catch (error) {
            
        }
    });
}

// update the 3 categories name
document.getElementById('name_cat_1').innerHTML = CAT_1
document.getElementById('name_cat_2').innerHTML = CAT_2
document.getElementById('name_cat_3').innerHTML = CAT_3

// launch all requests and display movies in the web page
display_categorie(get_best_movie(), "best_movie")
display_categorie(get_top_rate_movies(), "top_rate")
display_categorie(get_category_1_movies(), "cat_1")
display_categorie(get_category_2_movies(), "cat_2")
display_categorie(get_category_3_movies(), "cat_3")

// attach the event of modal window closing
window.onclick = function(event) {
    if (event.target == modal_window) {
        modal_window.style.display = "none";
    }
}
