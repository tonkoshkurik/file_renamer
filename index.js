const glob = require("glob");
const RuTranslit = require('./translit-russian/index.js');
const translit = require('translit') ( RuTranslit );
const args = process.argv.slice(2);
const dir = args[0];
const path = require('path');
var DomParser = require('dom-parser');
const options = {

}
const csv = require("fast-csv");

function matchPerc(wordList, text){
  var matches = text.filter((word)=>{return wordList.includes(word)}).length
  return (matches / text.length * 100).toFixed(2) + '%'
}

function strip(html){
  let doc = new DomParser().parseFromString(html, 'text/html');
  // console.log(doc);
  return doc.textContent || "";
}

function die(str) {throw new Error(str || "Script ended by death");}

function findMatch(item) {
  return strip(item);
  // console.log(strip(item));
}

// let's fuel array of csv lines, after we will modify it later
const csv_import = [];
csv
 .fromPath(path.join(dir, "import.csv")) // { headers: true} 
 .on("data", function(data){
    let line = data;
    csv_import.push(data);
    // die(JSON.stringify(data));
    // data.forEach( findMatch );
 })
 .on("end", function(){
    console.log("done");
    let header = csv_import[0].forEach((item,i,array) => {
      if(item.length < 2) {
        array[i].pop;
      }
      array[i] = translit(item)
    });
    console.log(csv_import);
 });

let t = translit('МИНАСЯН АРАРАТ VАШОТОВИЧ');
console.log(t);


// options is optional
glob("*/*/*.jpg", options, function (er, files) {
  // files is an array of filenames.
  // console.log(files, files.length);

  files.forEach((file) => renaming(file));
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})
function renaming(file) {

  // console.log(file);
  array =  file.split(/\s+|\//);

  // after we going to rename this  
}




// var fs = require('fs'),
//     path = require('path'),
//     args = process.argv.slice(2),
//     dir = args[0],
//     match = RegExp(args[1], 'g'),
//     replace = args[2],
//     files;

// const settings = {
//   match: RegExp('so', 'g'),
//   replace: '_'
// }

// const RuTranslit = require('./translit-russian/index.js');

// const translit = require('translit') ( RuTranslit );

// let wd = args[0]; 

// function renaming({ match = RegExp('so', 'g'), replace = '_' }, dir) {

//   files = fs.readdir(dir, function(err, files){

//     console.log(files);

//     files.filter(function(file) {
//       let check;
//       fs.stat(file, (err, stats)=>{
//         console.log(file, stats);
//         return file.match(match);
//         check = stats ? file.match(match) : renaming(settings, path.join(dir, file));
//       });
//       return check;
//     }).forEach(function(file) {

//       console.log(file);

//       // let filePath = path.join(dir, file);
//       // let newFilePath = path.join(dir, file.replace(settings.match, settings.replace));
      
//       // fs.renameSync(filePath, newFilePath);
//     });
//   });

// }
// renaming(settings, wd);

