const request = require('request')
const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ce7d91ab137a70ee970fa247cd71727&query='+latitude+','+longitude+'&units=m'
    
    request({url , json: true}, (error, { body }) => {
        if (error){
            callback('Impossibile raggiungere il servizio meteo',undefined)
        } else if ( body.error){
            callback('Impossibile trovare il luogo',undefined)
        } else { 
            callback (undefined,{ 
            gradi: body.current.temperature,
            pioggia: body.current.precip,
            
            })
        }
     }) 
    }

module.exports = forecast