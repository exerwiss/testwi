Kept the project simple, HTML/5, CSS, Javascript
Didn't see any need for any frameworks in this simplistic code.
HTML code is minimum, javascript generating contents
Testing using the qunit tests. Simple to install, and easy enough to integrate into CI Jenkins/Karma

url to test is test/qtest.html
url to view is weather.html

hosted on 
http://www.syyed.com/wipro/weather.html
http://www.syyed.com/wipro/qtest.html

directory structure
css - style sheets
js - javascript
test - test files 
(datatest2 - Glasgow, metric : datatest3 - Glasgow, imperial : datatest4 - Glasgow, standard)


Improvements

- htmlprocess.js,processDayTimeWeatherHTML is fixed order and format. 
  Wish to remove individual item into functions, will allow more flexiblity

- Have extra details hidden, expandable
- Icons for compass are basic, quick. Need to adapt and align better (slightly offset)
- Colour, font, layout improvements : Basic at present

- Allow city to be set / searched for
- Allow units to be set
- Round temperature (remove decimals)
- Allow for current weather to be displayed too. 

- select what information to display by user
- select which reports to pull
