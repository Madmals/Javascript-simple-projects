import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    doc,
    setDoc,
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect
} from 'firebase/auth'
import { effect } from './reactive.js';
import { vides } from './component/AsideVide.js';
import { asideView, home, login} from './load.js';
import { emptyInputSignUp, emptyInputLogin } from './state.js';
import { onYouTubeIframeAPIReady } from './player.js';
import { searchListener, createColEl } from './utils.js';


const firebaseConfig = {
    apiKey: "AIzaSyDNn8p-vd6CtiNWX4T1a5OoiWVOeXwcWvk",
    authDomain: "musicplayer-cd251.firebaseapp.com",
    projectId: "musicplayer-cd251",
    storageBucket: "musicplayer-cd251.appspot.com",
    messagingSenderId: "553113604509",
    appId: "1:553113604509:web:e154649e5d932f6593df74"
};

initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore();


const createDefaultDb = (data) => {
    const colRefrence = collection(db, 'default')
    addDoc(colRefrence, {
        defaultTimestamp: data.convertStartTimestamp,
        defaultText: data.elementText,
        defaultPlayerTime: data.elementStart
    })
}

const getSingleDoc = async () => {
    const docref = doc(db, 'default', "Mrn9z6THK58M54uEy0WJ")
    const data = await getDoc(docref)
    return data.data()

}

const signUpEmailandDb = async () => {
    const signupForm = document.querySelector('.submit')
    const emails = document.querySelector('.email')
    const passs = document.querySelector('.password')
    signupForm.addEventListener('click', async (e) => {
        e.preventDefault()
        const email = emails.value
        const password = passs.value
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password)

            const colRef = doc(db, 'collection', user.uid)
            const data = {
            }
            console.log('ok takat ni')
            await setDoc(colRef, data)

            asideView.init()
            onYouTubeIframeAPIReady()
            searchListener()
            //load player
            document.getElementById('aside').classList.remove('justify-center', 'items-center')

        } catch (error) {
            // should just use firebase error as base 
            effect(emptyInputSignUp())

            throw new Error(error)
        }
    })
}

const loginEmail = () => {
    const LoginForm = document.querySelector('.logins')
    const emails = document.querySelector('.emai')
    const passs = document.querySelector('.pas')
    LoginForm.addEventListener('click', async (e) => {
        e.preventDefault()
        const email = emails.value
        const password = passs.value
        try {

            await signInWithEmailAndPassword(auth, email, password)

            asideView.init()

            onYouTubeIframeAPIReady()
            searchListener()

            //retrieve db

        } catch (error) {

            effect(emptyInputLogin())
            throw new Error(error)
        }
    })
}

const logOut = () => {
    const Logout = document.querySelector('.aside-btn')
    Logout.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            await signOut(auth)
            login.init()
            location.reload()
        } catch (error) {
            throw new Error(error)
        }
    })
}

const checkAuthState = onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        asideView.init()
        document.getElementById('aside').innerHTML = vides.load()

        document.getElementById('aside').classList.remove('justify-center', 'items-center')

        const searchVal = document.querySelector('.search')
        searchVal.disabled = false
        onYouTubeIframeAPIReady()
        searchListener()

        const docRef = doc(db, 'collection', user.uid)

        await setDoc(docRef,{},{ merge: true })


        if (docRef) {
            const docToadd = await getDoc(docRef)
        if (Object.keys(docToadd.data()).length === 0) {
        }else{

            Object.values(docToadd.data()).forEach((val) => {
                createColEl(val.title)
            })
        }
        } else {
            console.log('ok takat ni')
            const docToadd = await getDoc(docRef)
        }

    } else {
        home.init()
    }
});

const currentSongLoadDataDb = async (data) => {
    let result
    const user = auth.currentUser;
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const docRef = doc(db, 'collection', user.uid)
        const docId = await getDoc(docRef)
        const ObjecData = docId.data()

        Object.keys(ObjecData).find((key) => {
            if ((data).includes(ObjecData[key].title)) {
                const data = {
                    vidId: key,
                    vidData: ObjecData[key]
                }
                result = data
            }
        })
        return result

    } else {
        throw new Error('already out')
    }

}

const addColtoDb = (async (data2) => {
    const user = auth.currentUser;

    if (user) {
        console.log('ok takat ni')
        const docRef = doc(db, 'collection', user.uid)

        // get doc base on userid 
        const docId = await getDoc(docRef)

        const limTitle = (data2.title).substring(0, 23).replace(/[^a-zA-Z0-9 ]/g, '')
        // store object from db base on useriddoc
        const objectUserData = docId.data()

        if (Object.keys(objectUserData).length === 0) {
            await setDoc(docRef,
                {
                    [data2.vidId]: {
                        title: limTitle,
                        convertStartTimestamp: data2.convertStartTimestamp,
                        elementText: data2.elementText,
                        elementStart: data2.elementStart
                    }
                })

        } else {

            Object.keys(objectUserData).forEach(async (key) => {
                if (key === data2.vidId) {
                } else {
                    await setDoc(docRef,
                        {
                            [data2.vidId]: {
                                title: limTitle,
                                convertStartTimestamp: data2.convertStartTimestamp,
                                elementText: data2.elementText,
                                elementStart: data2.elementStart
                            }
                        }, { merge: true })
                }
            })
        }

        const docToadd = await getDoc(docRef)

        const objData = docToadd.data()

        Object.values(objData).forEach((val, idx) => {

            createColEl(val.title)

            document.querySelector('.addPlaylist').disabled = true
        })

    } else {
        // No user is signed in.
        throw new Error('no user')
    }
})


const delDataDb = async (data) => {
    const user = auth.currentUser;
    if (user) {
        const docRef = doc(db, 'collection', user.uid)
        // get doc base on userid 
        const docId = await getDoc(docRef)

        const objectUserData = docId.data()
        const obj2 = Object.keys(objectUserData).map(key => {
            if (!(objectUserData[key].title).includes(data.substring(0, 10))) {
                return ({ [key]: objectUserData[key] })
            }
        })
        //update into doc
        const obj3 = Object.assign({}, ...obj2)
        await setDoc(docRef, obj3)
        // const docToadd = await getDoc(docRef)
        // Object.values(docToadd.data()).forEach((val) => {
        //     createColEl(val.title)
        // })
        const docToadd = await getDoc(docRef)

        const objData = docToadd.data()

        
        const el = document.querySelector('.playlist');
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }

        Object.values(objData).forEach((val, idx) => {

            createColEl(val.title)

        })
    }
}

const authWihGogle = async () => {
    try {
        const provider = new GoogleAuthProvider()
        await signInWithRedirect(auth, provider)

    } catch (error) {
        throw new Error(error)
    }
}

export { signUpEmailandDb, loginEmail, checkAuthState, logOut, authWihGogle, createDefaultDb, getSingleDoc, addColtoDb, currentSongLoadDataDb, delDataDb }
