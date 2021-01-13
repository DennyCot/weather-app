const path = require ('path')
const express = require('express')
const hbs = require ('hbs')
const fs = require('fs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')
// console.log(__dirname)
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath )
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        rain: '3.0%',
        name: 'Denny'
    })
}) 

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About me',
        name:'denny',
        surname: 'cottone',
        age: 22
    } )
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:"Help page",
        name:'denny'
    })
}) 

app.get('/weather',(req, res) =>{
    if(!req.query.address){
         return res.send({
             error: 'no adress specified'
         })

    }
      const address =req.query.address
      geocode(address ,(error, {latitude, longitude, location}= {}) =>{
            if(error){
                return res.send({error})
            }
            forecast( latitude , longitude ,(error , forecastData)  => {
                if(error){
                    return res.send({error})
                }
                   return res.send({
                       
                    forecast : forecastData,
                    location,
                    address: req.query.address
                  })
            })
            
       
    })
    
})

app.get('/products', (req, res) =>{
   if(!req.query.search){
       return res.send({
       error:'devi fornire una richiesta valida'
      })
    }


    console.log(req.query.search)
    return res.send({
        product:[]
    })
})

app.get('*',(req ,res) => {
    res.render('404',{
        errorMessage:"Page not found",
        title:'404',
        name:'Denny'
    })
})

app.get ('/help/*', (req, res) => {
    res.render('404',{
        errorMessage:"Article not found",
        title:'404',
        name:'Denny'
    })

})






// HANDLER
// app.get('/help',(req , res) => {
//     app.use(express.static(publicDirectoryPath))
// })

// app.get('/',(req , res) => {
//     res.send(
//     {
//         rain:'2.0%',
//         degree: '2°',
//         location: 'Torino'
//     })
// })



app.listen(port, () => {
console.log('il server è on sulla porta'+port)
})