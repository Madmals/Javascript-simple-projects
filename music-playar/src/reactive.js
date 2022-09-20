    let activeEffect = null

const dependicies = new Set()

//wathcer
function effect(fn) {
    activeEffect = fn
    if (activeEffect) activeEffect()
    activeEffect = null
}

//register effect to the dep (set)
function track() {
    // add effect as properties to new Set 
    if (activeEffect) {
        console.log('track')
        dependicies.add(activeEffect)
    }
}
//execute all the effect 
function trigger() {
    dependicies.forEach(effect => effect())
    console.log('trigger')

}
// declarative Effect (get ) proxy
const reactive=(target)=> {
    const handler =
    {
        //overwrite the properties of object
        //target is orginal obj key is key in object
        get(target, key, receiver) {
            track()
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
            trigger()
            return true
        }
    }
    return new Proxy(target, handler)
}


export {reactive,effect}