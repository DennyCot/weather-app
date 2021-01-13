


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')   /* recupero il dato attraverso il box di ricerca*/
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()                          /*interrompo l'aggiornamento browser
                                                cosi da avere la possibilità di prendere i dati  */

    const location = search.value              /* estraggo il valore tramite .value */                             
    console.log(location)

    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{                                     /*recupero i dati tramite url */
            messageOne.textContent = data.location.toString() 
            messagetwo.textContent =  '[ Descrizione:        '+data.forecast.descrizione+ ' ]-----  '+'  [            Gradi:            ' +data.forecast.gradi+ ' ]-----  '+ '  [     Gradi percepiti:          '+ data.forecast.temPercepita + ' ]'   
            messagethree.textContent = '[ Pioggia:              '+data.forecast.pioggia+  ' ] -----  '+'  [   Umidità:           ' +data.forecast.umidita+' ]'
            messagefour.textContent =  '[ Visibilita:         '+ data.forecast.visibilita+ ' ] -----  '+'  [   data:             '+data.forecast.data+' ]'
          }
    })
})
})