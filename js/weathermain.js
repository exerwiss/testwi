/* 
 * URL to use
 */

var weatherurl = "datatest2";
urlcity="Glasgow,UK";
urlunits="metric";
weatherurl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a9b6f0ee504a9c1541d9d6b876d2ee5d" + "&q=" + urlcity + "&units=" + urlunits;



urlunits="";
weatherurl = "test/datatest4";
urlunits="imperial";
weatherurl = "test/datatest3";
urlunits="metric";
weatherurl = "test/datatest2";

urlcity="Glasgow,UK";
urlunits="metric";
weatherurl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a9b6f0ee504a9c1541d9d6b876d2ee5d" + "&q=" + urlcity + "&units=" + urlunits;

//urlunits="metric";
//weatherurl = "test/datatest2";

/*
 * If the main url is loaded and returned with data call this function
 */

function success () {
   var result = checkexpecteddata (weatherdata.data);
   document.getElementById("status").innerHTML = "";
   if (result == 0)
   {
      result = checkqtyofdata (weatherdata.data);
      if (result != 0) document.getElementById("status").innerHTML = "Incomplete data";
      console.log (result);
   }
   if (result == 0)
   {
      result = processDaysHTML (maintable, weatherdata.data);
      if (result != 0) document.getElementById("status").innerHTML = "Bad data";
      console.log (result);
   }
   
}

/*
 * If the url has a problem show status, and clear tale
 */

function fail (text) {
   clearHTML (maintable);
   document.getElementById("status").innerHTML = "Failure " + text;
}


/*
 * Main javascript called here
 */
 function main () {
    
    weatherdata.getdata (weatherurl,success,fail);
    prepareunits (urlunits);
}