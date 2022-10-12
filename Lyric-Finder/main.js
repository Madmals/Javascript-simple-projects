
const artist_val = document.querySelector('.header__con__artist')
const song_val = document.querySelector('.header__con__song')
const search_btn = document.querySelector('.fa-search')
const lyric_con = document.querySelector('.content__con__lyric')
const enter = document.querySelector('.header__con__song')


//api lyric
const search_lyric = async () => {

	const songs = song_val.value
	const artist = artist_val.value

	let url = `https://api.vagalume.com.br/search.php?apikey=660a4395f992ff67786584e238f501aa&art=${artist}&mus=${songs}&extra=relart`

	try {
	const res = await fetch(url)

	const data = await res.json()


	lyric_con.innerHTML = `
	<p class="new_p">
	${data.mus[0].text}
	</p>
	`
		
	} catch (error) {
	lyric_con.innerHTML = `
	<p class="new_p">
	No lyric found for this song.
	</p>`
	}
}

search_btn.addEventListener('click', (e) => {
	search_lyric()
})

enter.addEventListener('keypress', (e) => {

	if (e.key == 'Enter') {

		search_lyric()
	}
})

//add to collection by creating new obj and append to local storage

const add_btn = document.querySelector('.fa-plus-circle')

add_btn.addEventListener('click', () => {

	const lyric_item = document.querySelector('.new_p')


	if (lyric_con.innerHTML.includes("You don't have any lyric yet") || song_val.value == '' && artist_val.value == '' || song_val.value == '' && artist_val.value != '' || song_val.value != '' && artist_val.value == '') {

		alert('Please insert song name and artist')

	} else {
		let lyrics = localStorage.getItem('lyric')

		if (lyrics === null) {
			lyric_obj = []
		} else {
			lyric_obj = JSON.parse(lyrics)
		}


		let new_object_lyric = {

			song: song_val.value,
			artist: artist_val.value,
			time: new Date().getTime(),
			lyric: lyric_item.textContent
		}

		lyric_obj.push(new_object_lyric)

		localStorage.setItem('lyric', JSON.stringify(lyric_obj))

		show_col()

	}
})

//create div from local storage obj
const show_col = () => {
	const sidecol_area = document.querySelector('.aside__body')
	let lyrics = localStorage.getItem('lyric')

	if (lyrics === null) {
		lyric_obj = []
	} else {
		lyric_obj = JSON.parse(lyrics)
	}

	let html = ''

	lyric_obj.forEach((eachobj, index) => {
		html += `
						<div class="aside__list">
						<div class="aside__eachlist">
					<i class="fas fa-user-astronaut">
					<br/>${eachobj.artist}</i>
					<i class="fas fa-music"><br/> ${eachobj.song} </i>
					</div>
					<i class="far fa-minus-square"></i>
				</div>
		`
	})

	sidecol_area.innerHTML = html
}

//clear local storage

const clear_all = document.querySelector('.fa-trash-alt')

clear_all.addEventListener('click', () => {
	localStorage.clear()
	show_col()
})


show_col()



//del each lyric

const del_lyric = document.querySelectorAll('.fa-minus-square')

del_lyric.forEach((eachone, index) => {
	eachone.addEventListener('click', () => {


		let lyrics = localStorage.getItem('lyric')

		let lyric_obj = lyrics != null ? JSON.parse(lyrics) : []

		lyric_obj.splice(index, 1)

		localStorage.setItem('lyric', JSON.stringify(lyric_obj))
		show_col()
	})

})

//sort by oldest date
const oldest = document.getElementById('select')

oldest.addEventListener('change', () => {
	let i = oldest.selectedIndex

	if (oldest[i].text == 'Newest') {
		let lyrics = localStorage.getItem('lyric')

		let lyric_obj = lyrics == null ? [] : JSON.parse(lyrics)


		let sort = lyric_obj.sort((a, b) => {
			return b.time - a.time
		})

		localStorage.setItem('lyric', JSON.stringify(sort))

		show_col()
	} else {
		let lyrics = localStorage.getItem('lyric')

		let lyric_obj = lyrics == null ? [] : JSON.parse(lyrics)


		let sort = lyric_obj.sort((a, b) => {
			return a.time - b.time
		})

		localStorage.setItem('lyric', JSON.stringify(sort))

		show_col()

	}

})


//click and load the lyrics from the sidebar
const all_col = document.querySelectorAll('.aside__list')

all_col.forEach((each,index)=>{
	each.addEventListener('click', ()=>{

		let lyrics = localStorage.getItem('lyric')

		let lyric_obj = lyrics === null ? []: JSON.parse(lyrics)


		lyric_con.innerHTML = `
		<p class="new_p">${lyric_obj[index].lyric}</p>`
	}
	)
})