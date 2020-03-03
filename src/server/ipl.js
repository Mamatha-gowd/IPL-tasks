function matchesPerYear (matches)
{
 //returning total no of matches happened per year   
return matches.reduce((totalmatches,value) => {
if (totalmatches[value.season] === undefined) {
    totalmatches[value.season] = 1;
} else {
    totalmatches[value.season]++;
}
return totalmatches;
}, {});//creating an empty object to store matches per year
}
function matchesWonPerTeamPerYear(matches)
{    
    // returning no of matches won per team per year in IPL match
 return matches.reduce((wonteam,value) => {
     if (wonteam[value.season] === undefined) {
         wonteam[value.season] = {};
     } 
     //checking existance of  season and winner property and assigning the value
     wonteam[value.season][value.winner] = ((wonteam[value.season][value.winner]) || 0) + 1;
     return wonteam;
    // initializing the empty object 
 },{});
 
}
function extraRunsConcededPerTeamIn2016(matches,deliveries) {
    const ids = [];// to store the id values in the array
    matches.forEach((value) => {
     if(value.season === '2016') {
         ids.push(value.id);
     }
    }
    )
    // comparing the match id in the deliveries and ids in the array
const arr = deliveries.filter((value)=> {return ids.includes(value.match_id);})
const res = arr.reduce((extraruns,value) => {
extraruns[value.bowling_team] = ((extraruns[value.bowling_team]) || 0 ) +  parseInt(value.extra_runs);
    return extraruns;
 },{});
return res;
}
function Top10EconomicalBowlersIn2015(matches,deliveries) {
    const ids = []; // to 
    const result = {};
    matches.forEach((obj) => {
        if (obj.season === '2015') {
           ids.push(obj.id);
    }
})
const top = deliveries.filter((value) => {return ids.includes(value.match_id)});
const res = top.reduce((bowlerovers, value) => {
if (!bowlerovers[value.bowler]) {
    bowlerovers[value.bowler] = ((bowlerovers[value.bowler]) || {});
}
bowlerovers[value.bowler].runs = ((bowlerovers[value.bowler].runs) || 0) + parseInt(value.total_runs)-parseInt(value.legbye_runs)-parseInt(value.bye_runs);
if(parseInt(value.wide_runs) === 0 && parseInt(value.noball_runs) === 0) {
bowlerovers[value.bowler].balls = ((bowlerovers[value.bowler].balls) || 0) + 1;
}
   return bowlerovers;
},{}) 
const econimicalbowlers = Object.values(res);
const keys = Object.keys(res);
const overs = econimicalbowlers.map((value)=> {
return value.runs/((value.balls)/6);
})

}

module.exports = {
    matchesPerYear,
    matchesWonPerTeamPerYear,
    extraRunsConcededPerTeamIn2016,
    Top10EconomicalBowlersIn2015

};