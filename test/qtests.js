QUnit.test ("Test1",function (assert) {
  assert.equal (1,1);
});



/*
 * Checking valid data checker
 */
QUnit.test ("Check valid data checker",function (assert) {
  assert.equal (checkexpecteddata (null),"-1","null data passed");
  assert.equal (checkexpecteddata (1),"-2","primitive data passed");
  assert.equal (checkexpecteddata ([1,2,3]),"-3","invalid data passed");
  assert.equal (checkexpecteddata ({"e":1,"cnt":2,"f":3}),"0","cnt data passed");
  assert.equal (checkqtyofdata ({"e":1,"cnt":2,"f":3}),"-5","bad cnt data passed");
  assert.equal (checkqtyofdata ({"e":1,"cnt":numOfDataPoints,"f":3}),"0","good cnt data passed");
  
});


/*
 *  checking getdate and gettime functions 
 */
QUnit.test ("Check getdate function",function (assert) {
  assert.equal (getdate(1506266387),"Sun Sep 24 2017","date good");
  assert.equal (getdate("hello"),"Invalid Date","bad date err");
});
QUnit.test ("Check gettime function",function (assert) {
  assert.equal (gettime(1506266387),"15:00","time good");
  assert.equal (gettime("joe"),"","bad time err");
});

/*
 * Load bad URL : Failure message to be displayed
 */
QUnit.test ("Load bad URL",function (assert) {
  weatherdata.getdata ("datatestbad",success,fail);
  
  
   var done = assert.async ();
   setTimeout (function () {
    var status = document.getElementById ("status");
    assert.equal (status.innerHTML.startsWith("Failure"),true,status.innerHTML);
    done(); },2000);

  
  
});

/*
 * Load good URL : Expect status field to be updated to blank
 */
QUnit.test ("Load good URL",function (assert) {
  weatherdata.getdata ("datatest2",success,fail);

  var done = assert.async ();
  setTimeout (function () {
    var status = document.getElementById ("status");
    assert.equal (status.innerHTML,"");
    done(); },4000);

});


/*
 * Try adding a cell
 */
QUnit.test ("Insert cell into table ",function (assert) {
  
  var table = clearHTML (maintable);
  clearHTML (status);
  assert.notEqual (table,null,"table found");
  assert.equal (table.innerHTML,"","Table cleared ");
  findCell (maintable,0,-1,0,"cell0_0","th");
  assert.equal (table.rows.length,1,"Table has one row");
  assert.equal (table.rows[0].cells.length,1,"Row has one cell");
});

/*
 * Try adding a cell appending and at position 1 and new row
 */
QUnit.test ("Insert cell into table ",function (assert) {
  
  var table = clearHTML (maintable);
  assert.notEqual (table,null,"table found");
  assert.equal (table.innerHTML,"","Table cleared ");
  var cell00 = findCell (maintable,0,-1,0,"cell0_0","th");
  assert.equal (table.rows.length,1,"Table has one row");
  assert.equal (table.rows[0].cells.length,1,"Row has one cell");
  
  findCell (maintable,0,-1,-1,"cell0_1","th");
  assert.equal (table.rows[0].cells.length,2,"Row has two cells");
  findCell (maintable,0,-1,1,"cell0_2","th");
  assert.equal (table.rows[0].cells.length,3,"Row has three cell");
  var cell00b = findCell (maintable,0,-1,-1,"cell0_0","th");
  assert.equal (table.rows[0].cells.length,3,"Row still has has three cell");
  assert.equal (cell00,cell00b,"same cell returned");
  
  assert.equal (table.rows[0].cells[0].id,maintable + "_cell0_0","cell 0-0 is first");
  assert.equal (table.rows[0].cells[1].id,maintable + "_cell0_2","cell 0-2 is second");
  assert.equal (table.rows[0].cells[2].id,maintable + "_cell0_1","cell 0-1 is third");
  
});

/*
 * Try adding two rows cell appending and at position 1 and new row
 */
QUnit.test ("Insert three rows into table ",function (assert) {
  
  var table = clearHTML (maintable);
  assert.notEqual (table,null,"table found");
  assert.equal (table.innerHTML,"","Table cleared ");
  var cell00 = findCell (maintable,0,-1,0,"cell0_0","th");
  assert.equal (table.rows.length,1,"Table has one row");
  assert.equal (table.rows[0].cells.length,1,"Row has one cell");
  
  
  findCell (maintable,1,-1,-1,"cell1_0","td");
  assert.equal (table.rows[1].cells.length,1,"Row 2 has 1 cells");
  findCell (maintable,2,-1,1,"cell2_0","td");
  assert.equal (table.rows[2].cells.length,1,"Row 3 has 1 cell");
  
});

/*
 * Try adding day cell and time
 */
QUnit.test ("Insertcells with different positions ",function (assert) {
  
  var table = clearHTML (maintable);
  assert.notEqual (table,null,"table found");
  assert.equal (table.innerHTML,"","Table cleared ");
  getCelltd (1,2,3);
  assert.equal (table.rows.length,1,"Table has one row");
  getCelltd (3,0,5);
  assert.equal (table.rows.length,2,"Table has two row");
  assert.equal (table.rows[0].id,"row"+0,"row 1 is row 0");
  
});

/*
 * Try adding day cell and time
 */
QUnit.test ("Unit conversion tests ",function (assert) {
  
  urlunits = "metric";
  prepareunits (urlunits);
  
  assert.equal (18/5,convertgen," 1 m/s = 3.6KPH");
  assert.equal (speed," km/h","km/h");
  assert.equal (unit," &#176;C","C");
  
  urlunits = "imperial";
  prepareunits (urlunits);
  assert.equal (1,convertgen," 1 mph");
  assert.equal (speed," mph","mph");
  assert.equal (unit," &#176;F","F");
  
  urlunits = "";
  prepareunits (urlunits);
  assert.equal (1,convertgen," 1 m/s ");
  assert.equal (speed," m/s","m/s");
  assert.equal (unit," &#176;K","K");
  
  var temp = 1.36;
  urlunits = "metric";
  prepareunits (urlunits);
  assert.equal (18/5*1.36,convertgen*1.36," 1.36m/s 4.896 kph");
  
  
});

