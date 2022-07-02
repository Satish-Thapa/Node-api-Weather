const { response } = require('express');
const express =require('express');
const app =express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


const https = require('https');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2d6e76d942dd33e5263ec46f1add73ae&units=metric";
   
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData=JSON.parse(data); //stringfy
             const temp = weatherData.main.temp;
             const des = weatherData.weather[0].description;
             //cant have two send but write
             res.write("<h1>The temp is " + temp + " .C</h1>");
             res.write("<h1>The temp is " + des + " .C </h1>");
        });
    });
})
;

app.listen(3000,function(){
    console.log("Server up and running");
}); 