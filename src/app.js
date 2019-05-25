const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const port = process.env.PORT || 3000

//define path for express config
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handlebars view engine and views location
app.set('view engine', 'hbs')//set view engine
app.set('views', viewsDir)//set view dir
hbs.registerPartials(partialsPath);//set partials dir

//setup static directory to serve 
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Nguyen Truong Giang"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nguyen Truong Giang'
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Nguyen Truong"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help Page",
        error:
            'Help article not found',
        name: "Nguyen Truong Giang"
    })
})

app.get('/weather', (req, res) => {
   if(!req.query.address){
       return res.status(400).send('You must provide an address');
   }

   geocode(req.query.address,(err,{longtitude,latitude,location}={})=>{
       if (err){
           return res.send({
               error: err
           })
       }
    forecast(latitude,longtitude,(err,forecastData)=>{
        if (err){
            return res.send({
                error: err
            })
        }
        res.send({
            address: req.query.address,
            location,
            forecastData
        })
    })
   })


})

//404 handler must come last because expess looks for
//the correct handler from top to bottom
//if express finds a match, it stops looking immediately
app.get('*'/*everything is a match*/, (req, res) => {
    res.render('404', {
        title: "Not found",
        error: 'Page not found',
        name: "Nguyen Truong Giang"
    })
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})
