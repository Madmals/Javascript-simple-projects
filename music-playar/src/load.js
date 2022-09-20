import AuthGoogle from './component/Login.js'
import HomeScreen from './component/HomeScreen.js'
import SignUp from './component/SignUp.js'
import { vides } from './component/AsideVide.js'
import { loginEmail,signUpEmailandDb } from './firebase.js'
import { delItemm, playlistClick } from './utils.js'
import { getSTranscribeResult } from './api.js'

const login = {
    init: () => {
        document.getElementById('aside').innerHTML = AuthGoogle.load()
        loginEmail()
    }
}

const home = {
    init: () => {
        document.getElementById('app').innerHTML = HomeScreen.load()
        const searchVal = document.querySelector('.search')
        searchVal.disabled = true
        const all = document.querySelector('.playlist')


        all.addEventListener('click', (e) => {
            if ((e.target).matches('span')) {
                console.log('ada jugak')
                console.log(e.target.innerHTML)
                playlistClick(e.target.innerHTML)
            } else if (e.target.matches('.delBtn')) {
                console.log('del button')
                const del = document.querySelector('.delBtn')
                delItemm(del.parentElement.innerHTML)
            }
        })
    }
}

const asideView = {
    init: async () => {
        document.getElementById('aside').innerHTML = vides.load()
        document.getElementById('aside').classList.remove('justify-center', 'items-center')
        const searchVal = document.querySelector('.search')
        searchVal.disabled = false


        if (searchVal.value == '') {
            await getSTranscribeResult('')
            document.querySelector('.addPlaylist').style.display = 'none'

        } else {
            document.querySelector('.addPlaylist').style.display = 'block'
        }

    }
}

const signUp = {
    init: () => {
        document.getElementById('aside').innerHTML = SignUp.load()
    }
}


const createAcct = {
    init: () => {
        const createAcc = document.querySelector('.create-acc')
        createAcc.addEventListener('click', async () => {
            //load sign up form
            signUp.init()
            signUpEmailandDb()
            loginLinks()
        })

    }
}

export { asideView, home, login, signUp,createAcct }