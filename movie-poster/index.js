const search = document.querySelector('#search')
const searchField = document.querySelector('#search__field')
const searchBtn = document.querySelector('#search__btn')
const sectionContainer = document.querySelector('#section__container')
const exploreText = document.querySelector('.explore-container')



  let movieWithfullData = []
  


  async function LoadMovies(searchMovies){
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=7ce63c7e&s=${searchMovies}`)
        const data = await res.json()
       
        if (data.Response === "True"){
        movieWithfullData = data.Search
        showMovies(movieWithfullData) 
        exploreText.style.display = "none"
       
      }
      
    }catch {
      alert(err)
    }
  }

  searchBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let searchMovies = (searchField.value).trim()
    LoadMovies(searchMovies)
    searchField.value = ""
  })




  
  
  function showMovies(arr){
    sectionContainer.innerHTML = ""
    let html = ""
    arr.map((movies) =>{
      fetch(`https://www.omdbapi.com/?apikey=7ce63c7e&i=${movies.imdbID}`)
      .then(res => res.json())
      .then(movie =>{
        html =`
        <div id="${movie.imdbID}" class="main__container">
             <img src="${movie.Poster}" alt="movie poster" class="poster__image">
             <div class="sub__container">
               <h2>${movie.Title}</h2>
               <div class="icon__container">
                  <p>
                   <span>${movie.Runtime}</span>
                   <span>${movie.Genre}</span>
                   <span class="fa fa-star checked"></span>
                   <span>${movie.imdbRating}</span>
                  </p>
                   
                   <i class="fa-solid fa-circle-plus icon__plus"></i>
            
               </div>    
               
               <p> 
                 ${movie.Plot}
               </p>
             </div>
           </div>
       `
        sectionContainer.innerHTML += html
      })
    })
  }


  sectionContainer.addEventListener('click', (e) =>{
      let positionClick = e.target
      if(positionClick.classList.contains('icon__plus')){
        let product_id = positionClick.parentElement.parentElement.parentElement.id
        addToAddCart(product_id)
      }
  })

  let watchlist = []

  function addToAddCart(id){
     watchlist.push(id)
     localStorage.setItem('watchlist', JSON.stringify(watchlist))
    
  }

  
    // <svg class="icon icon__plus" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"width="24" height="24" fill="none" viewBox="0 0 24 24">jk<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>

