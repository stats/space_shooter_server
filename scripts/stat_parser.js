var fs = require('fs');

var array = fs.readFileSync('ship_stats_raw.txt').toString().split("\n");
var index = 0;
var hash = {};
var ships = [];
for(let i in array) {
  data = array[i].split("\t");
  if(index == 0) {
    ships = data;
    for(let j = 0; j < ships.length; j++) {
      ships[j] = ships[j].replace("\r","");
      hash[ships[j]] = { };
    }
    index++;
  } else {
    for(let j = 1, s = 0; j < data.length; j++, s++) {
      hash[ships[s]][data[0]] = + data[j].replace("\r","");
    }
  }
}

console.log(JSON.stringify(hash, null, 2));
