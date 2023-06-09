const express=require("express");
require('dotenv').config()
const app=express();
const countryList = require('country-list');
const bodyParser=require("body-parser");
app.use(express.static("public"))
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
const https=require("https");
var flag;
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'Pm' : 'Am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
const date= new Date();
var wData={};
var fourDays=[];
var c=[];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"
  ];
  
console.log(formatAMPM(date));
const days=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]
app.get("/",function(req,res){  
   
   wData={};
   fourDays=[];
   c=[];
   wData={
    four:fourDays,
    current:c
   }
    res.render("home",{time:formatAMPM(date),day:days[date.getDay()],year:date.getFullYear(),month:months[date.getMonth()],date:date.getDate(),info:wData,flag:" ",bDays:[],city:"",imgurl:"",country:""});
})

var condition="";
app.post("/",function(req,res){
  var yesterday = new Date(date.getTime());
  yesterday.setDate(date.getDate() - 1);
  var Dyesterday = new Date(date.getTime());
  Dyesterday.setDate(date.getDate() - 2);
  var Tyesterday = new Date(date.getTime());
  Tyesterday.setDate(date.getDate() - 3);
  var Fyesterday = new Date(date.getTime());
  Fyesterday.setDate(date.getDate() - 4);
  

  var beforeDays=[days[yesterday.getDay()],days[Dyesterday.getDay()],days[Tyesterday.getDay()],days[Fyesterday.getDay()]] 
  wData={};
   fourDays=[];
   c=[];
   wData={
    four:fourDays,
    current:c
   }
  var city=req.body.city;
  https.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid="+process.env.key+"&units=metric", function(response) {
    let data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function() {
      try {
        const weather_data = JSON.parse(data);
                for(var i=1;i<5;i++){
                fourDays.push( Math.floor(weather_data.list[i].main.temp)+"°")
              }
              wData.four=fourDays;
            var speed=weather_data.list[0].wind.speed;
            var humidity=weather_data.list[0].main.humidity;
            var temp= Math.floor(weather_data.list[0].main.temp)+"°";
            var description=weather_data.list[0].weather[0].description;
            var imgurl=weather_data.list[0].weather[0].icon
            c.push(speed+"kmph");
            c.push(humidity);
            c.push(temp);
            c.push(description);
            wData={
              four:fourDays,
              current:c
            }
            const countryName = countryList.getName(weather_data.city.country);
            res.render("home",{time:formatAMPM(date),day:days[date.getDay()],year:date.getFullYear(),month:months[date.getMonth()],date:date.getDate(),info:wData,flag:"yes",bDays:beforeDays,city:city,imgurl:imgurl,country:countryName});


              //console.log(fourDays)
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  }).on("error", function(error) {
    console.error("Error retrieving weather data:", error);
  });
  // var a=[12,123,43,24]
  // fourDays.push(a)
  // c.push(1.59);
  // c.push(37);
  // c.push(33+"°");
  // c.push('broken clouds')
  // wData={
  //   four:fourDays,
  //   current:c
  // }
  



    })
app.listen("3000",function(){
    console.log("started");
})