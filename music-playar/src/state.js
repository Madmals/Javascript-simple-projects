
//credit to medium post on state
import { reactive } from './reactive.js'
import { passValid } from './utils.js'

const components = (query) => {
    const els = document.querySelectorAll(query)
    console.log(els)
    if (els.length > 1) {
        return els
    } else if (els.length == 1) {
        return els[0]
    } else {
        return null
    }
}

let state = reactive({
    default: 'aa',
    email: {
        name: 'Fill out the email',
        set: () => setState1(() => state.default = state.email.name)
    },
    password: {
        name: 'Fill out the password',
        set: () => setState1(() => state.default = state.password.name)
    },
    confirm: {
        name: 'Fill out the confirm password',
        set: () => setState1(() => state.default = state.confirm.name)
    },
    passmail: {
        name: 'Fill out the confirm password and email',
        set: () => setState1(() => state.default = state.passmail.name)
    },
    form: {
        name: 'Fill out all the form',
        set: () => setState1(() => state.default = state.form.name)
    },
    aintSame: {
        name: 'Password are not equal',
        set: () => setState1(() => state.default = state.aintSame.name)
    },
    yoPaswordAintGood: {
        name: 'Password: uppercase and lowercase letters and numbers',
        set: () => setState1(() => state.default = state.yoPaswordAintGood.name)
    },
    form: {
        name: 'Fill out all the form',
        set: () => setState2(() => state.default = state.form.name)
    },
    yoNobodyInHouse: {
        name: 'There is no user,Please Register',
        set: () => setState2(() => state.default = state.yoNobodyInHouse.name)
    },
    passmail: {
        name: 'Fill out the  password and email',
        set: () => setState2(() => state.default = state.passmail.name)
    },
    password: {
        name: 'Fill out the password',
        set: () => setState2(() => state.default = state.password.name)
    },
    email: {
        name: 'Fill out the email',
        set: () => setState2(() => state.default = state.email.name)
    },
})

const renderDom = (el) => {
    if(components(el)){
        return components(el).textContent = `${state.default}`
    }
}

const setState1 = (set) => {
    set()
    renderDom('.exists')
}

const setState2 = (set) => {
    set()
    renderDom('.errir')
}

const emptyInputSignUp = () => {
    if (components(".password").value == "" && components(".confirm").value == "" && components(".email").value == "") {
        state.form.set()
        console.log('a')
    } else if (components(".password").value == "" && components(".email").value == "") {
        state.passmail.set()
        console.log('b')
    } else if (components(".password").value == "") {
        state.password.set()
    } else if (components(".confirm").value == "") {
        state.confirm.set()
    } else if (components(".email").value == "") {
        state.email.set()
    } else if (components(".password").value != components(".confirm").value) {
        state.aintSame.set()
    } else if (components(".password").value != components(".confirm").value) {
        state.aintSame.set()
    } else {
        state.default
    }
    renderDom('.exists')
}

const emptyInputLogin = () => {
    if (components(".emai").value == "" && components(".pas").value == "") {
        state.form.set()
        console.log('a')
    } else if (components(".emai").value == "") {
        state.email.set()
        console.log('a')
    } else if (components(".pas").value == "") {
        state.password.set()
        console.log('a')
    } else if (!passValid(components(".pas").value)) {
        state.yoPaswordAintGood.set()
        console.log('a')
    } else if (!passValid(components(".pas").value)) {
        state.yoPaswordAintGood.set()
        console.log('a')
    } else {
        state.yoNobodyInHouse.set()
        console.log('a')
    }
    renderDom('.errir')
}

export { emptyInputSignUp, emptyInputLogin }