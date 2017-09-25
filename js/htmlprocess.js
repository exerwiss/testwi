// Assuming valid data at this point
// so no repeat checking
// data will have a cnt value and a list object
// data will have the correct expected days (5)

const rowname = "row";
var maintable = "weathertable";
const dayname = "day";
const timename = "_time_";


/*
 * Main entry to generate the page html code
 */
function processDaysHTML (tablename, data)
{
    var n;  
    maintable = tablename;
    
    // find the total number of days in the data
    numOfDays=scanDataForDays (data);  
    for (n=0;n<numOfDays;n++)
      {
	  console.log ("processing " + n);
	  
	   // get the entry number for the day
	  var dayplace = dataDays[n];
	   
	  // get the day data
	  var daydata = data ["list"][dayplace];
	  var date = daydata ["dt"];
	  processSingleDateHTML (date,n);
	  
	  // per day upto the max daily maxNumOfDailyPoints
	  // get the entry check the time matches the clock intervals
	  // if not goto next counter, place empty cell, and check again
	  
	  var timecount = 0;
	  for (m=0;m<maxNumOfDailyPoints;m++)
	  {
	    if (dayplace+timecount < totalEntries)
	    {
	      daydata = data ["list"][dayplace+timecount];
	      
	      var processentry = checkTime (daydata,m);
	      if (processentry)
	      {
		processDayTimeWeatherHTML (daydata ,n,m);
		timecount++;
	      }
	      else
		blankData (n,m);
	    }
	    else blankData (n,m);
	      
	  }
      }
    processDayTimesHTML (0);
    getCityCountry (data);
    return 0;
}

/*
 * add a cell to a parent (row) at a specified position
 * if the parent has a cell then add it at a position
 * if the parent has no cells then just append it
 * if passed a -1 just append
 * 
 */
function addCellAtPos (cell,parent, pos)
{
  if (pos == -1)
    parent.appendChild (cell);
  else if (parent.cells.length > 0)
         parent.insertBefore (cell,parent.cells[pos]);
      else
	 parent.appendChild (cell);
}

function clearHTML (elementid)
{
  var element = null;
  if (elementid != null)
    element = document.getElementById (elementid);
  if (element!=null)
    element.innerHTML = "";
  return element;
}


/*
 * Find a cell with cellid
 * If not found then add a new cell in row, column and type th vs td
 * 
 * 
 */
function findCell (tablename,rowid,rowpos,colpos,cellid,type)
{
    var cell= document.getElementById(tablename+"_"+cellid);
    if (cell==null)
    {
	table = document.getElementById (tablename);
	row = document.getElementById (rowid);
	cell = document.createElement (type);
	cell.id = tablename+"_"+cellid;
	if (row == null)
	{
	  if ((rowpos == -1) || (table.rows.length < rowpos))
	    row = table.insertRow (-1)
	  else
	    row = table.insertRow (rowpos);
	  row.id = rowid;
	}
	addCellAtPos (cell,row,colpos);
    }
   return cell;
}

/*
 * Wrapper functions around find cell
 */
function getCell (day,timeitem,colpos,type)
{
    var cell=null;
    cell = findCell (maintable,rowname+timeitem,timeitem,colpos,dayname + day + timename + timeitem, type);
    return cell;
}
function getCellth (day,timeitem,colpos)
{
  return getCell (day,timeitem,colpos,"th");
}
function getCelltd (day,timeitem,colpos)
{
  return getCell (day,timeitem,colpos,"td");
}

/*
 * generate the day header
 */

function processSingleDateHTML (data,day)
{
  
    //var date1 = data ["list"][day*numOfDailyPoints]["dt"];
    var date1 = data;
    var daycount = day + 1;
    var column = getCellth (daycount,0,-1);
    column.innerHTML = getdate (date1);
}

/*
 * from the data get the city and country and display
 */

function getCityCountry (data)
{
  var city = data ["city"] ["name"];
  var country = data ["city"] ["country"];
  var element = document.getElementById ("city");
  if (element != null)
    element.innerHTML = city + "," + country;
  
}

/*
 * generate the time column. 
 * Initially was using from the data supplied
 * but now using fixed format as per data supplied intervals
 */
function processDayTimesHTML (day)
{
    var cell = getCellth (0,0,0);
    cell.innerHTML = "Time";
    for (n=0;n<maxNumOfDailyPoints;n++)
    {
	  cell = getCelltd (day,n+1,0);
	  cell.innerHTML = n * (24/maxNumOfDailyPoints) + ":00";
    }	  
}

/*
 * Main html generator function for data
 */
function processDayTimeWeatherHTML (dataroot,day,time)
{

          var item = dataroot;
          var cell = getCelltd (day+1,time+1,-1);
	  var data;

	  
	  data = item ["weather"][0]["description"];
	  icon = item ["weather"][0]["icon"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + "<div><span  class='description'>"  + data+"</span><img class='description'  src='http://openweathermap.org/img/w/"+icon + ".png'></div><br>";
	  
	  data = item ["main"]["temp"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + "<div class='temp'>Temp : "  + data + unit + "</div>";
	  
	  data = item ["main"]["temp_min"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + "<div class='lowtemp'>Low : "  + data + unit + "</div>";
	  
	  data = item ["main"]["temp_max"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + "<div class='hightemp'>High : " + data + unit + "</div><br>";

	  
	  
	  data = item ["clouds"]["all"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + "<div class='clouds'>Clouds : "  + data + "%" + "</div>";
	  
	  data2 = item ["wind"]["speed"];
	  if (data2!=null)
	  {
	    if (!isNaN(data2))
	      data2 = Math.round(data2 * convertgen);;
	    cell.innerHTML = cell.innerHTML + "<div class='wind'>Wind : " + data2 + speed + "</div>";
	  }
	  
	  data = item ["wind"]["deg"];
	  if (data!=null)
	    cell.innerHTML = cell.innerHTML + 
	    "<div class='winddir' > <img src='img/compass1.png'>" + 
	    "<div class='winddir2' style='transform:rotate(" + data + "deg);' > <img src='img/compass2.png' ></div>"  
	    //+ data + data2 + speed
	    +"</div><br>";

}

/*
 * Just generate a blank cell
 * for where no data exists
 */

function blankData (day,time)
{

          
          var cell = getCelltd (day+1,time+1,-1);
	  cell.innerHTML = "&nbsp;";
  
}