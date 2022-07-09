const cancel_btna = document.querySelector('.cancela')
const cancel_btnb = document.querySelector('.cancelb')
const conntainer_a=document.querySelector('.upload-containera')

conntainer_b = document.querySelector('.upload-containerb')

console.log(cancel_btna)



cancel_btna.addEventListener('click', ()=>{
    conntainer_a.classList.add('hide')
})



cancel_btnb.addEventListener('click', () => {
    conntainer_b.classList.add('hide')
})