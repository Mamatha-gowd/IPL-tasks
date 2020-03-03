const {matchesPerYear,
    matchesWonPerTeamPerYear,
    extraRunsConcededPerTeamIn2016,
    Top10EconomicalBowlersIn2015} = require('./ipl.js');
// storing csv file in the csvFilepath1
const csvFilePath1 = '/home/mamatha/ipldrill/src/data/matches.csv';
const csvFilePath2 = '/home/mamatha/ipldrill/src/data/deliveries.csv';
const csvToJsonFile = require('csvtojson');
//converting csv file to json file
//storing filesystem in the fs variable
const fs = require('fs');
//writing output in the specified path
const resultObjToFile = (resultfilepath,resultObj)=> {
fs.writeFile(resultfilepath,resultObj, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }   
   console.log("JSON file saved.");
    });
}
csvToJsonFile().fromFile(csvFilePath1).then((matches)=>{  
const matchesres = JSON.stringify(matchesPerYear(matches))
//declaring outpath and storing output in the variable
resultObjToFile("/home/mamatha/ipldrill/src/output/matchesPerYear.json",matchesres)    
const matchesWon = JSON.stringify(matchesWonPerTeamPerYear(matches))
resultObjToFile("/home/mamatha/ipldrill/src/output/matchesWon.json",matchesWon)  
csvToJsonFile().fromFile(csvFilePath2).then((deliveries)=>{  
const extraRunsConceded = JSON.stringify(extraRunsConcededPerTeamIn2016(matches,deliveries))
resultObjToFile("/home/mamatha/ipldrill/src/output/extraRnsConceded.json", extraRunsConceded)   
const bowlersEconomy = JSON.stringify(Top10EconomicalBowlersIn2015(matches,deliveries))
resultObjToFile("/home/mamatha/ipldrill/src/output/bowlersEconomy.json",bowlersEconomy)
   // console.log(bowlersEconomy) 
 })
})


