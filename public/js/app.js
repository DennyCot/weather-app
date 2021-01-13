
console.log('ciao')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')   /* recupero il dato attraverso il box di ricerca*/
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                          /*interrompo l'aggiornamento browser
                                                cosi da avere la possibilità di prendere i dati  */

    const location = search.value              /* estraggo il valore tramite .value */                             
    console.log(location)

    fetch('http://192.168.10.103:80/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{                                     /*recupero i dati tramite url */
            messageOne.textContent = data.location.toString() 
            messagetwo.textContent ='Gradi: ' +data.forecast.gradi+   '      Probabilità di pioggia: '+ data.forecast.pioggia+'%'
        }
    })
})
})