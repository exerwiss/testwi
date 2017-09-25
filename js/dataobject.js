// 8 day points * 5 days
var numOfDays = 5;
var numOfDailyPoints = 8;
var numOfDataPoints = numOfDays * numOfDailyPoints;

var maxNumOfDays=0;
var maxNumOfDailyPoints = 0;
var dataDays = [];
var totalEntries=0;
/* hard coding for now, as we expect metric data */
var convertgen = 18/5;
var unit=" &#176;C";
var speed=" m/s";
speed = " km/h";

function prepareunits (type)
{
  if (type=="")
  {
    unit=" &#176;K";
    speed=" m/s";
    convertgen = 1;
  }
  if (type=="metric")
  {
    unit=" &#176;C";
    speed=" m/s";
    speed = " km/h";
    convertgen = 18/5;
  }
  if (type=="imperial")
  {
    unit=" &#176;F";
    speed = " mph";
    convertgen = 1;
  }
  
}

/*
 * Check some basic details about returned object
 */

function checkexpecteddata (data)
{	 
  
    var result = 0;
    if (data == null)
    {
      result = -1;
    }
    if ((result == 0) && (typeof data !== 'object'))
    {
      result = -2;
    }
    if ((result == 0) && (typeof data["cnt"] === 'undefined'))
    {
      result = -3;
    }
    return result;
}

/*
 * Expect to get a certain number of data points
 * currently this is coded above
 * could check to see number of days and each day has a certain number of points
 * 
 */
function checkqtyofdata (data)
{
  
  var result=0;
  
  if ((data.cnt == "undefined") || (data.cnt == null))
  {
     result = -4;
  }
  if (result == 0)
  {
    if (data.cnt != numOfDataPoints)
      result = -5;
  }
  return result;
  
}

var weatherdata = {  
  data : "",
  status : -1,
  getdata : function (url,callbackgood, callbackbad) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onerror = function () {status = 1;callbackbad ("");};
    req.onreadystatechange = function() 
    {
      if (req.readyState === 4) 
      {
	if (req.status >= 200 && req.status < 400) 
	{
	      weatherdata.data = JSON.parse(req.responseText);
	      console.log (req.responseText);
	      status = 0;
	      callbackgood();
	} else 
	{
	      // Handle error case
	      status = 1;
	      callbackbad (" data not received " + req.status + " " + req.responseText);
	      console.log (req.status + " +++ " + req.responseText);
	}
      }
    };
    try {
      req.send();
    } catch (err) {
      callbackbad("unable to load " + err );
    };
 }
};

function getdate (dateobj)
{
   var str = "";
   if ((dateobj != "undefined") && (dateobj != null))
   {
      var date1 = dateobj;
      date1 = date1 * 1000;
      var newdate = new Date (date1);
      var str = newdate.toDateString();
   }
   return str;
}
function gettime (dateobj)
{
   var str = "";
   if ((dateobj != "undefined") && (dateobj != null))
   {
      var date1 = dateobj;
      date1 = date1 * 1000;
      var newdate = new Date (date1);
      if (Number.isInteger(newdate.getUTCHours() ))
	str = newdate.getUTCHours() + ":00";
   }
   return str;
}

function checkTime (data,hour)
{
  var clockInterval = 24/maxNumOfDailyPoints;
  var timegiven = gettime (data["dt"] );
  var timeset = hour * clockInterval;
  if (timegiven == timeset + ":00")
      return true;
  else
      return false;
  
}

function scanDataForDays (data)
{
  totalEntries = data ["cnt"]; 
  var n;
  var currentday = getdate (data ["list"][0]["dt"]);
  var count = 1;
  var maxhourcount = 0;
  var hourcount = 1;
  dataDays [0] = 0;
  for (n=0;n<totalEntries;n++)
  {
     if (currentday != getdate (data ["list"][n]["dt"]))
     {
       dataDays[count] = n;
       count++;
       if (maxhourcount < hourcount)
	 maxhourcount = hourcount;
       hourcount=1;
       currentday = getdate (data ["list"][n]["dt"]);
       
     }
     else
     {
       hourcount++;
     }
  }  
  maxNumOfDays = count;
  maxNumOfDailyPoints = maxhourcount;
  return maxNumOfDays;
  
}
  