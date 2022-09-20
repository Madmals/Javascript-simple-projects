import './style.css'
import { home, login,createAcct} from './load.js'
import { checkAuthState, logOut, authWihGogle } from './firebase.js'

home.init()
login.init()
createAcct.init()



checkAuthState()
logOut()

const gogle = document.querySelector('.authgogle')
gogle.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('testbutton')
    authWihGogle()
})














