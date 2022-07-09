import { KEY_VALUE1, KEY_VALUE2 } from "../config.js"


const cardArea = document.querySelector(".card-area")

const imageUrl = 'https://image.tmdb.org/t/p/w1280'
const urlTrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY_VALUE1}`
const urlTag = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_VALUE2}
&language=en-US`

async function fetchUrl(url, n) {
    try {
        const res = await fetch(url, {}, n)
        const data = await res.json()
        return data
    } catch (error) {
        if (n == 1)
            throw error
        const res = await fetch(url, {}, n)
        const data = await res.json()
        return data
    }
}

async function trending() {

    try {
        const data = await fetchUrl(urlTrending, 5)
        // console.log(data) 
        const eachgenreId = []

        data.results.forEach(eachgenre => {
            eachgenreId.push(eachgenre.genre_ids)
        })

        showMovies(data.results)

        getRating()

        return eachgenreId

    } catch (error) {
        throw error
    }

}

async function tag() {
    try {
        const data = await fetchUrl(urlTag, 5)
        const dataGenre = data.genres
        return dataGenre

    } catch (error) {
        throw error
    }
}

function getRating(){

    const ratingTotal = 10

    let voteAll = document.querySelectorAll(".voter")

    voteAll.forEach(eachvote => {
        // // get percentage
        const starPercentage = (Number(eachvote.textContent) / ratingTotal) * 100

        // //rounded to 10 decimal
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`

        //set width of stars inner to percentage
        let startWith = document.querySelectorAll(".stars-inner")

        startWith.forEach((list) => {
            list.style.width = starPercentageRounded
        })
    })
}


const showMovies = (movie) => {

    cardArea.innerHTML = ``
    movie.forEach((mov,idx) => {
        idx++;
        const { title, poster_path, vote_average, release_date } = mov

        const cardMovie = document.createElement('div')
        cardMovie.classList.add('card')

        cardMovie.innerHTML = `

                <div class="p-2 number">${idx}</div>
                <div class="img-container">
		
                <img
                    src="${imageUrl}${poster_path}"
                    alt="">
		</div>
                <div class="text p-1 ">
                    <h3>${title}</h3>
                    <div class="star-area">

                        <p class="rel">${release_date}</p>

                
                        <span class="stars-outer">
			<div class="stars-inner">
            </div>

			</span>
            <div class="voter">${vote_average}</div>

                        </div>

                    <div class="tag">

                    </div>
                    </div>
                </div>
		`
        cardArea.appendChild(cardMovie)

    })
}


const run = async () => {
    const [a, b] = await Promise.all([trending(urlTrending, 5), tag(urlTag, 5)])
    let data = a.map(eachofa => eachofa.map(id => b.filter(bitem => bitem.id === id).map(item => item.name)).join(" "))


    let tags = document.querySelectorAll('.tag')


    for (let i = 0; i < data.length; i++) {

        for (i = 0; i < tags.length; i++) {

            let newtag = document.createElement('div')
            newtag.classList.add(".add")
            newtag.style.marginRight = "5px"
            newtag.style.fontWeight = "700"
            newtag.innerHTML = data[i]
            tags[i].appendChild(newtag)

        }
    }
}


run()
