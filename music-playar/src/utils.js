import PasswordValidator from "password-validator";
import { login, asideView ,createAcct} from "./load.js"
import { signUpEmailandDb, addColtoDb, currentSongLoadDataDb, delDataDb } from "./firebase.js"
import { getSearchResult, getSTranscribeResult} from "./api.js";
import { onYouTubeIframeAPIReady } from "./player.js";

const passValid = (check) => {
    const schema = new PasswordValidator()
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123'])

    return schema.validate(check);
}

//password mach
export const onChange = () => {
    if (document.querySelector('.password').value ==
        document.querySelector('.confirm').value) {
        document.querySelector('.submit').disabled = false;
    } else {
        document.querySelector('.submit').disabled = true;
    }
}


const loginLinks = () => {
    const loginLink = document.querySelector('.link-login')
    loginLink.addEventListener('click', async () => {
        login.init()
        //attach event listener back
        createAcct.init()
    })

}


const searchListener = () => {

    const searchVal = document.querySelector('.search')
    searchVal.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            //search vid
            document.querySelector('.addPlaylist').disabled = false
            const searchSong = await getSearchResult()
            // add vido id to last res 

            //loading asideView coz youtube player need to replace again div with id player to iframe div
            asideView.init()
            onYouTubeIframeAPIReady(searchSong.vidId)

            const data = await getSTranscribeResult(searchSong.vidId)
            const lastRes = {
                ...data,
                title: searchSong.vidTitle,
                vidId: searchSong.vidId
            }
            document.querySelector('.addPlaylist').addEventListener('click', async () => {
                // add ok but it replace the collection
                //nedd to query doc data and check for duplicate before updating
                await addColtoDb(lastRes)
            })
            //run add to db 
            return lastRes

        }
    })
}


const playlistClick = async (data) => {
    const res = await currentSongLoadDataDb(data)

    //loading asideView coz youtube player need to replace again div with id player to iframe div
    asideView.init()
    onYouTubeIframeAPIReady(res.vidId)

    // getdocdb and filter by title 
    // load dari db     
    await getSTranscribeResult(res.vidData)

}


const createEl = (time, text) => {
    const tbody = document.querySelector('tbody')
    for (let el of time) {
        const con = document.createElement('tr')
        const td = document.createElement('td')
        td.classList.add('p-2', 'whitespace-nowrap')
        con.appendChild(td)
        const timestampdiv = document.createElement('button')

        timestampdiv.classList.add('time', 'border-4', 'border-black', 'p-2')
        // timestampdiv.classList.add('cursor-pointer','bg-sky-600' ,'hover:bg-sky-700')
        timestampdiv.innerHTML = `${el}`
        td.appendChild(timestampdiv)
        tbody.appendChild(con)
    }



    const alltr = document.querySelectorAll('tbody > tr')
    let allnewtd = []
    for (let el of text) {
        const td = document.createElement('td')
        td.classList.add('p-2', 'whitespace-nowrap')
        const textdiv = document.createElement('div')
        textdiv.classList.add('text-left', 'font-normal', 'text-black')
        textdiv.innerHTML = `${el}`
        td.appendChild(textdiv)
        allnewtd.push(td)
    }

    for (let i = 0; i < alltr.length; i++) {
        alltr[i].appendChild(allnewtd[i])
    }

}



const createColEl = (data) => {
    const conCol = document.querySelector('.playlist')
    const song = document.createElement('span')
    const delBtn = document.createElement('button')

    song.innerHTML = data
    delBtn.innerHTML = 'X'
    song.classList.add("pleach", "border", "p-2", "border-solid", "rounded", "hover:bg-gray-300", "flex", "flex-row", "justify-between")
    delBtn.classList.add("bg-slate-600", "hover:bg-red-700", "p-2", "rounded", "text-black", "font-medium", "px-4", "delBtn")

    song.appendChild(delBtn)
    conCol.appendChild(song)

}

const delItemm = (data)=>{
    console.log(data)
    delDataDb(data)
}



export { passValid,loginLinks, searchListener, createEl, createColEl, playlistClick,delItemm }
