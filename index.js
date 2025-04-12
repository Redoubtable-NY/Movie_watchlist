const searchBar = document.querySelector("#search-bar")
const searchBarElements = document.querySelector("#search-bar").elements
const filmListContainer = document.querySelector("#film-list-container")
const movieIconMessageContainer = document.querySelector(".movie-icon-message-container")
const filmSearchResultsContainer = document.querySelector(".film-search-results-container")
const filmSearchErrorContainer = document.querySelector(".film-search-error-container")

let returnedFilms = []
let returnedFilmPlots = []

console.log(localStorage.length)

searchBar.addEventListener("submit", function(e){
    e.preventDefault()
    const searchValue = searchBarElements[0].value
    movieSearchResults(searchValue)
})


async function movieSearchResults(movieTitle){
    try {
        filmSearchErrorContainer.classList.add("hidden")
        filmSearchResultsContainer.classList.remove("hidden")
        movieIconMessageContainer.style.display = "none"
        filmSearchResultsContainer.innerHTML = ""
        const returnedFilms = []
        const returnedFilmsIdData = []
        let moviesPlusPlots = []
        const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=f620b288&s=${movieTitle}`)
        const data = await resp.json() 
        const filmSearchResults = data.Search
        const filmIDs = filmSearchResults.map(function(film){
            return film.imdbID.substring(0,10)
        })
        for(film of filmSearchResults){
            returnedFilms.push(
                {
                  "Title": film.Title,
                  "Poster": film.Poster,
                  "imdbID": film.imdbID
                }
            )
        }
    
        for(id of filmIDs){
            // https instead of http
            const idResp = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=f620b288&type=movie`)
            const idData = await idResp.json()
            returnedFilmsIdData.push(
            {
                "Genre": idData.Genre,  
                "Plot": idData.Plot,
                "Rating": idData.imdbRating,
                "Runtime": idData.Runtime
            }
            )
        }
    
        for(let i = 0; i < returnedFilms.length; i++){
            moviesPlusPlots.push(
                {
                "Title": returnedFilms[i].Title,
                "Poster":  returnedFilms[i].Poster,
                "imdbID": returnedFilms[i].imdbID,
                "Genre": returnedFilmsIdData[i].Genre,
                "Plot": returnedFilmsIdData[i].Plot,
                "Rating": returnedFilmsIdData[i].Rating,
                "Runtime": returnedFilmsIdData[i].Runtime,
                }
            )
        }
        
        if(localStorage.length=0){
            for(let i=0; i < 10; i++){
            filmSearchResultsContainer.innerHTML += `
                <div class="search-result-container">
                    <div class="poster-container">
                        <img src=${moviesPlusPlots[i].Poster} class="film-poster" alt="${moviesPlusPlots[i].Title} poster">
                    </div>
                    <div class="film-text-container">
                        <div class="film-title-rating-container">
                            <h2 class="film-title">${moviesPlusPlots[i].Title}</h2> 
                            <img src="/images/Star-Icon.svg" alt="star icon">
                            <h3 class="film-rating">${moviesPlusPlots[i].Rating}</h3>
                        </div>
                        <div class="film-details-container">
                            <div class="film-runtime-and-genre-container">
                                <p class="film-details">${moviesPlusPlots[i].Runtime}</p>
                                <p class="film-details">${moviesPlusPlots[i].Genre}</p>
                            </div>
                            <section class="film-cta-container">
                                <div class="add-to-watchlist-container">
                                    <img src="/images/Add-Icon.png" alt="add icon">
                                    <button class="watchlist-add-cta" data-title="$${moviesPlusPlots[i].Title}" data-moviePPkey="${i}" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Watchlist</button>
                                </div>
                                <div class="remove-movie-container hidden">
                                    <img src="/images/Remove-Icon.png" alt="add icon">
                                    <button class="watchlist-remove-cta" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Remove</button>
                                </div>
                            <section>
                        </div>
                        <p class="film-plot">${moviesPlusPlots[i].Plot}</p>
                    </div>
                </div>
                `
            }
        }else{
            const localStorageKeys = Object.keys(localStorage)
            const cleanKeys = localStorageKeys.map(function(filmKey){
                return filmKey.substring(5, 14)
                }
            )
            for(let i=0; i < 10; i++){
                // if(cleanKeys[i] === moviesPlusPlots[i].imdbID){
                if(cleanKeys.includes(moviesPlusPlots[i].imdbID)){
                    console.log(moviesPlusPlots[i].imdbID, moviesPlusPlots[i].Title)
                    filmSearchResultsContainer.innerHTML += `
                    <div class="search-result-container">
                        <div class="poster-container">
                            <img src=${moviesPlusPlots[i].Poster} class="film-poster" alt="${moviesPlusPlots[i].Title} poster">
                        </div>
                        <div class="film-text-container">
                            <div class="film-title-rating-container">
                                <h2 class="film-title">${moviesPlusPlots[i].Title}</h2> 
                                <img src="/images/Star-Icon.svg" alt="star icon">
                                <h3 class="film-rating">${moviesPlusPlots[i].Rating}</h3>
                            </div>
                            <div class="film-details-container">
                                <div class="film-runtime-and-genre-container">
                                    <p class="film-details">${moviesPlusPlots[i].Runtime}</p>
                                    <p class="film-details">${moviesPlusPlots[i].Genre}</p>
                                </div>
                                <section class="film-cta-container">
                                    <div class="add-to-watchlist-container hidden">
                                        <img src="/images/Add-Icon.png" alt="add icon">
                                        <button class="watchlist-add-cta" data-title="$${moviesPlusPlots[i].Title}" data-moviePPkey="${i}" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Watchlist</button>
                                    </div>
                                    <div class="remove-movie-container">
                                        <img src="/images/Remove-Icon.png" alt="remove icon">
                                        <button class="watchlist-remove-cta" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Remove</button>
                                    </div>
                                <section>
                            </div>
                            <p class="film-plot">${moviesPlusPlots[i].Plot}</p>
                        </div>
                    </div>
                    `
                }else{
                    filmSearchResultsContainer.innerHTML += `
                    <div class="search-result-container">
                        <div class="poster-container">
                            <img src=${moviesPlusPlots[i].Poster} class="film-poster" alt="${moviesPlusPlots[i].Title} poster">
                        </div>
                        <div class="film-text-container">
                            <div class="film-title-rating-container">
                                <h2 class="film-title">${moviesPlusPlots[i].Title}</h2> 
                                <img src="/images/Star-Icon.svg" alt="star icon">
                                <h3 class="film-rating">${moviesPlusPlots[i].Rating}</h3>
                            </div>
                            <div class="film-details-container">
                                <div class="film-runtime-and-genre-container">
                                    <p class="film-details">${moviesPlusPlots[i].Runtime}</p>
                                    <p class="film-details">${moviesPlusPlots[i].Genre}</p>
                                </div>
                                <section class="film-cta-container">
                                    <div class="add-to-watchlist-container">
                                        <img src="/images/Add-Icon.png" alt="add icon">
                                        <button class="watchlist-add-cta" data-title="$${moviesPlusPlots[i].Title}" data-moviePPkey="${i}" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Watchlist</button>
                                    </div>
                                    <div class="remove-movie-container hidden">
                                        <img src="/images/Remove-Icon.png" alt="remove icon">
                                        <button class="watchlist-remove-cta" data-arrayIdentifier="${moviesPlusPlots[i].imdbID}">Remove</button>
                                    </div>
                                <section>
                            </div>
                            <p class="film-plot">${moviesPlusPlots[i].Plot}</p>
                        </div>
                    </div>
                    `
                }
            }
        }
        
        document.addEventListener("click", function(e){
            if(e.target.className === "watchlist-add-cta"){
                console.log(e.target)
                e.target.parentElement.classList.add("hidden")
                e.target.parentElement.parentElement.childNodes[3].classList.remove("hidden")
                let moviePlusPlotsIndexValue = parseInt(e.target.dataset.movieppkey)
                let moviePlusPlotsUniqueId = e.target.dataset.arrayidentifier
                let jsonFilm = JSON.stringify(moviesPlusPlots[moviePlusPlotsIndexValue])
                localStorage.setItem(`film-${moviePlusPlotsUniqueId}`, jsonFilm)
                console.log(localStorage)
            }else if(e.target.className === "watchlist-remove-cta"){
                console.log(e.target)
                console.log(e.target.parentElement)
                e.target.parentElement.classList.add("hidden")
                e.target.parentElement.parentElement.childNodes[1].classList.remove("hidden")
                let moviePlusPlotsUniqueId = e.target.dataset.arrayidentifier
                localStorage.removeItem(`film-${moviePlusPlotsUniqueId}`)
            }
            else{

            }
        })
    }catch(error){
        filmSearchErrorContainer.classList.remove("hidden")
        filmSearchResultsContainer.classList.add("hidden")
        document.getElementById("error-message").innerText = `We encountered an error. Please try another film search - less specific searches work best.`
    }
}

function test(){
    console.log(watchlistFilms)
}