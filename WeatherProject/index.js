// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=ff641c0d84aa980f985282822c42c81a


// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid=ff641c0d84aa980f985282822c42c81a


// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=ff641c0d84aa980f985282822c42c81a

// https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=ff641c0d84aa980f985282822c42c81a

const http = require('http');
const fs = require('fs');

const requests = require('requests');

const homeFile = fs.readFileSync("home.html",'utf-8');


const replaceVal=(tempraryVal , orgVal)=>{
  let temperature = tempraryVal.replace("{%tempVal%}", orgVal.main.temp);
     temperature = temperature.replace("{%tempMin%}",orgVal.main.temp_min);
     temperature = temperature.replace("{%tempMax%}",orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}", orgVal.weather.main);

     
    return  temperature ;

}


const server = http.createServer( (req,res)=>{
    if(req.url=== "/"){
        requests( "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=ff641c0d84aa980f985282822c42c81a")
        .on('data',  (chunk) => {
                const objData = JSON.parse(chunk); // ye json se obj me convert kerdea 
                const arrData = [objData]; // ye arr me convert kerdea
                // console.log(arrData);  // arr of an object 
                // console.log(arrData[0].main.temp);
                const realTimeData = arrData.map((val)=>
                    replaceVal(homeFile, val)
                ).join("");
                res.write(realTimeData);
                console.log(realTimeData);
            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});

server.listen(8000, "127.0.0.1");