const request = require('request')


const geocode = (address, callback ) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGVubnljIiwiYSI6ImNram1xOHB3aTNuemYzMnNjNnk2YWdzdWsifQ.ypptDSmvpHPdAzD_7B7d1w&limit=1'
    request ({ url, json: true}, (error, {body}) => {
            setTimeout(() => {

            if(error){
                callback('impossibile raggiungere il servizio meteo!', undefined)
            } else if(body.features.length === 0){
                callback('Nessun risultato per questo luogo. Prova ad inserirne un altro', undefined)            
            } else{
                
                   callback(undefined,{
                     latitude: body.features[0].center[1],
                     longitude: body.features[0].center[0],
                     location: body.features[0].place_name
                   })  
            }
        });
    })
}



module.exports = geocode
