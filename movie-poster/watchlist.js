const watchlistContainer = document.querySelector('.watchlist__container')
const removeItem = document.querySelector('.main__container')


let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

document.addEventListener('DOMContentLoaded', () => {
  let html = ""
  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `<p class="empty">Your watchlist is empty.</p>`
  }else {
    watchlist.forEach((id) => {
      fetch(`https://www.omdbapi.com/?apikey=7ce63c7e&i=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        html =`
        <div id="${data.imdbID}" class="main__container cart">
             <img src="${data.Poster}" alt="movie poster" class="poster__image">
             <div class="sub__container">
               <h2>${data.Title}</h2>
               <div class="icon__container">
                  <p>
                   <span>${data.Runtime}</span>
                   <span>${data.Genre}</span>
                   <span class="fa fa-star checked"></span>
                   <span>${data.imdbRating}</span>
                  </p>
                   
                  <i onclick="deleteMovie('${data.imdbID}')"  class="fa-solid fa-circle-minus icon__minus"></i>
            
               </div>    
               
               <p> 
                 ${data.Plot}
               </p>
             </div>
        </div>
       `
       watchlistContainer.innerHTML += html
      })
    })
  }
})



document.addEventListener('click', (e) => {
  let click = e.target
  console.log(click)
  if(click.classList.contains('icon__minus')){
    let product_id = click.parentElement.parentElement.parentElement.id
    deleteMovie(product_id)
   
  }
})

function deleteMovie(imdbID){
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    watchlist = watchlist.filter((id) => id !== imdbID)
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
    location.reload(); 
}