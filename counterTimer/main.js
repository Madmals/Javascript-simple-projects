const svg = document.querySelector('svg');

const coundownEL = document.querySelector('.time-counter');

const butt = document.querySelector(".start")
const buttclear = document.querySelector(".pause")
const buttreset = document.querySelector(".reset")

console.log(buttreset)


//counter 5 minutes

const startingMinutes = 1
let time = startingMinutes * 60



function startTimer(){

timer = setInterval(updateCountdown,1000);
let time;
}


function pauseTimer(){
    clearInterval(timer)
}



function resetTimer(){
    location.reload()
}

butt.addEventListener('click',()=>{
startTimer()
butt.classList.add('hide')
buttclear.classList.remove('hide')
})


buttclear.addEventListener('click', ()=>{
    pauseTimer()
    buttclear.classList.add('hide')
    butt.classList.remove('hide')
    

})


buttreset.addEventListener('click', ()=>{
    resetTimer()
    

})

function updateCountdown() {

    const minutes = Math.floor(time / 60)
    let seconds = time % 60; 

    seconds = seconds < 10 ? `0${seconds}`:seconds

    coundownEL.innerHTML = `${minutes}:${seconds}`

    time--
    
    if (time < 0){
        location.reload()
    }
}



//update variable value of every hour sec and minutes

currentTime = new Date();

svg.style.setProperty('--start-seconds', currentTime.getSeconds());
svg.style.setProperty('--start-minutes', currentTime.getMinutes());
svg.style.setProperty('--start-hours', currentTime.getHours() % 12);



var array1 = [true, true, true, false,
    true, true, true, true,
    true, false, true, false,
    true, false, false, true,
    true, true, true, true,
    false, false, true, true];




function countSheeps(array1) {
    let counter = 0
    d = []
    for (i = 0; i < array1.length; i++) {
        for (j = 0; j < i.length; j++)
    
                d.push([i][j])
            
    }
    console.log(d)
}

countSheeps(array1)


