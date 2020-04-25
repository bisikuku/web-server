var geo = require('./geocoding')
var forecast = require('./forecast')
var express = require('express')
var path =  require('path')
var hbs = require('hbs')


console.log(path.join(__dirname, '../templates'))

var glock = express()

var port = process.env.PORT || 80

var publicDirectory = path.join(__dirname, '../public')
var viewsPath = path.join(__dirname, '../templates/views')
var partials = path.join(__dirname, '../templates/partials')


glock.set('view engine', 'hbs')
glock.set('views', viewsPath)
hbs.registerPartials(partials)

glock.use(express.static(publicDirectory))
glock.use(express.static(partials))
glock.use(express.static(viewsPath))

glock.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dami kuku'
    })
})

glock.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the weather app',
        name: 'Dami Kuku'
    })
})

glock.get('/guide', (req, res) => {
    res.render('guide', {
        helpfulText:'Very useful stuff bruh',
        title: 'Weather App',
        subject: 'weather'
    })
})

glock.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'We need address'
        })
    }
    //const address = 
    geo(req.query.address, (error, {latitude = "", longitude = "", location = ""} = {}) => {
        if (error){
            res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, locationData) => {
            if (error){
                res.send({error})
            }
        
            res.send({
                location: location,
                locationData,
                address: req.query.address
            })
        
        })

    }) 
})

glock.get('/usefull', (req,res) => {
    console.log(req.query)
    res.send({
        stuff: []
    })
})

glock.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Dami Kuku',
        errorMessage:'page not found'
    })
})

glock.listen(port, () => {
    console.log('glock is open on port 80 waiting for connection')
})


