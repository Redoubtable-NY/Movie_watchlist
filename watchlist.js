const watchlistFilmsContainer = document.getElementById("watchlist-films-container")
const filmsInWatchlistContainer = document.querySelector(".films-in-watchlist-container")
const defaultWatchlistMessageContainer = document.querySelector(".default-watchlist-message-container")

const watchlistFilms = []

if(localStorage.length > 0){
    watchlistFilms.length = 0
    defaultWatchlistMessageContainer.classList.add("hidden")
    const localStorageKeys = Object.keys(localStorage)
        for(key of localStorageKeys){
                watchlistFilms.push(JSON.parse(localStorage.getItem(key)))
        }
    renderTest()
    }

function renderTest(){
    filmsInWatchlistContainer.innerHTML = " "
    for(let i=0; i < watchlistFilms.length; i++){
            watchlistFilmsContainer.style.justifyContent = "start"
            filmsInWatchlistContainer.innerHTML += `
            <div class="watchlist-films-container">
                <div class="poster-container">
                    <img src=${watchlistFilms[i].Poster} class="film-poster" alt="${watchlistFilms[i].Title} poster">
                </div>
                <div class="film-text-container">
                    <div class="film-title-rating-container">
                        <h2 class="film-title">${watchlistFilms[i].Title}</h2> 
                        <img src="/images/Star-Icon.svg" alt="star icon">
                        <h3 class="film-rating">${watchlistFilms[i].Rating}</h3>
                    </div>
                    <div class="film-details-container">
                        <div class="film-runtime-and-genre-container">
                            <p class="film-details">${watchlistFilms[i].Runtime}</p>
                            <p class="film-details">${watchlistFilms[i].Genre}</p>
                        </div>
                        <section class="film-cta-container">
                            <div class="remove-movie-container">
                                <img src="/images/Remove-Icon.png" alt="remove icon">
                                <button class="watchlist-remove-cta" data-arrayIdentifier="${watchlistFilms[i].imdbID}">Remove</button>
                            </div>
                        <section>
                    </div>
                    <p class="film-plot">${watchlistFilms[i].Plot}</p>
                </div>
            </div>
            `
        }
    }

document.addEventListener("click", function(e){
        if(e.target.className === "watchlist-remove-cta"){
            let moviePlusPlotsUniqueId = e.target.dataset.arrayidentifier
            localStorage.removeItem(`film-${moviePlusPlotsUniqueId}`)
            e.target.closest(".watchlist-films-container").remove()
            pageReset()
        }
    }
)

function pageReset(){
    if(localStorage.length <= 1){
        this.location.reload()
    }
}