const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetch = require("cross-fetch");

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Sandeep Kumar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Sandeep Kumar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address!'
        });
    }

    const address = req.query.address;
    const url =
        `http://api.openweathermap.org/data/2.5/weather?q=${address}&APPID=82796fcf91ded29a924e178e5c16a341&units=metric`

    fetch(url)
        .then((result) => {
            //console.log(result.status, result.size)
            if (result.status >= 400) {
                res.send({
                    error: 'Please provide a proper address!'
                })
                throw new Error("Bad response from server");
            }
            return result.json();
        })
        .then((weather) => {
            res.send({
                temp: weather.main.temp,
                humidity: weather.main.humidity,
                pressure: weather.main.pressure,
                address: weather.name
            });
        })
        .catch(err => {
            console.error(err);
            res.send({
                error: 'Failed to fetch data. Please Try again!'
            })
        });
});

app.get('*', (req, res) => {
    res.render('errorPage', {
        name: 'Sandeep Kumar',
        problem: 'Page'
    });
});

app.listen(port, () => {
    console.log("server up and running !");
});