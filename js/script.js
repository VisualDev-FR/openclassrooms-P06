const MAX_MOVIES_BY_CATEGORIES = 7;
const MAX_MOVIE_BY_PAGE = 5;
const MAX_PAGE = Math.ceil(MAX_MOVIES_BY_CATEGORIES / MAX_MOVIE_BY_PAGE);

const CAT_1 = "Adventure"
const CAT_2 = "Family"
const CAT_3 = "Comedy"

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

function display_categorie(results, class_id){

    results.then((top_rate_movies) => {

        const top_rate_div = document.getElementById(class_id);

        for(let i = 0; i < Math.min(top_rate_movies.length, MAX_MOVIES_BY_CATEGORIES); i++){

            var current_movie = top_rate_movies[i];
            
            top_rate_div.innerHTML += 
            "<div class= 'movie'>" + 
                "<img src=" + current_movie.image_url + ">" +
            "</div>";
        }

        top_rate_div.getElementsByClassName("slide_left")[0].addEventListener('click', (e) => {
            top_rate_div.scrollLeft += top_rate_div.clientWidth / MAX_MOVIES_BY_CATEGORIES
        });

        top_rate_div.getElementsByClassName("slide_right")[0].addEventListener('click', (e) => {
            top_rate_div.scrollLeft -= top_rate_div.clientWidth / MAX_MOVIES_BY_CATEGORIES
        });        
    });
}

display_categorie(get_best_movie(), "best_movie")
display_categorie(get_top_rate_movies(), "top_rate")
display_categorie(get_category_1_movies(), "cat_1")
display_categorie(get_category_2_movies(), "cat_2")
display_categorie(get_category_3_movies(), "cat_3")
