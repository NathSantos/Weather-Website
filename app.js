const express = require('express');
// 'https' is a native module from node, so doesn't need an installation
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res) {
    const query = req.body.cityName;
    const apiKey = "c2df3fce9fe991b30b0a56039c40c1f7";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response) {
        console.log("statusCode: " + response.statusCode);
        
        response.on("data", function(data) {        // JSON.parse() -> string form to pretty and organized javascript form
            const weatherData = JSON.parse(data);   // JSON.stringify() -> pretty and organized javascript form to string form 
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const url_icon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<p>The weather is currently <b>" + description + "</b></p>");
            res.write("<img src=" + url_icon + "></img>");
            res.send();
        })
    });
})

app.listen(port, function() {
    console.log("Servidor rodando na porta 3000");
})