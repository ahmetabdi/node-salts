var fs = require("fs");

fs.unlink(__dirname + '/db/movienight.json', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("File deleted successfully!");
});

var osmosis = require('osmosis');
var JsonDB = require('node-json-db');
var db = new JsonDB("db/movienight", true, true);

osmosis
.get('http://movienight.ws/')
.paginate('.siguiente a', 32)
.find('.movie > div')
.set('location', 'a @href')
.set('image', 'img @src')
.follow('@href')
.find('#movie > div > div.headingder > div.datos > div.dataplus')
.set('title', 'h1')
.set('rating', '.rank')
.find('#play-1')
.set('url', 'iframe @src')
.set('iframe', 'iframe:html')
.data(function(data) {
  if(data.title.indexOf("Twitter") > -1) {
    // Do not save this entry.
  }
  else {
    db.push("/movies[]", data, true);
  }
})
// .log(console.log)
// .error(console.log)
// .debug(console.log)
