const mdata =  require('/home/mamatha/ipldrill/src/data/matches.json');
const ddata = require('/home/mamatha/ipldrill/src/data/deliveries.json');
function noOfMatches ()
{
const obj = {};
for (let i = 0; i < ddata.length; i++) { 
    let first = ddata[i]['season'];  
    if (obj[first]) {
        obj[first]++;
    }
    else {
        obj[first] = 1;
    }
}
return obj;
}
function noOfMatchesPerTeam()
{    
let obj1 = {};
 ddata.forEach((Object) => {
 if (obj1[Object.season] == undefined) {
        obj1[Object.season] = {};
} if (obj1[Object.season][Object.winner] == undefined) {
    obj1[Object.season][Object.winner] = 1;
} else {
    obj1[Object.season][Object.winner]++;
 }
} );
 return obj1;
}
function extraRunsPerTeam(ddata , mdata) {
    let ids = [];
    let obj2 = {};
    ddata.forEach((Object) => { 
        if (Object.season === 2016) {
            ids.push(Object.id)
        } 

    } )
    ids.forEach((i) => {
        mdata.forEach((m) => {
            if (m.match_id == i) {
                if(obj2[m.bowling_team]) {
                    let t = m.bowling_team;
                    let extra = parseInt(m.extra_runs);
                    obj2[t] += extra;
                } else {
                    t = m.bowling_team;
                    extra = parseInt(m.extra_runs);
                    obj2[t] = extra;
                }
            }
        } )
    } ) 
    return obj2;
}
function econimicalBowlers(ddata,mdata) {
    const ids = [];
    const result = {};
    ddata.forEach((obj) => {
        if (obj.season === 2015) {
           ids.push(obj.id);
    }
} ) 
console.log(ids);
    ids.forEach((i) => { 
        mdata.forEach((obj) => {
            if(obj.match_id === i) {
            //x = obj.bowler;
            //console.log(x);
            if (result[obj.bowler] === undefined) {
                result[obj.bowler] = {};
                if (obj.wide_runs != 0 || obj.noball_runs != 0) {
                    result[obj.bowler].balls = 0;
                    totalruns = parseInt(obj.total_runs) - parseInt(obj.legbye_runs) - parseInt(obj.bye_runs);
                    result[obj.bowler].runs =  totalruns;
                    //console.log(totalruns);
                } else {
                    result[obj.bowler].balls = 1;
                    totalruns = parseInt(obj.total_runs) - parseInt(obj.legbye_runs) - parseInt(obj.bye_runs);
                    result[obj.bowler].runs = totalruns;
                    //console.log(totalruns);
                }
            } else {
                    if (obj.wide_runs != 0 || obj.noball_runs != 0) {
                       totalruns = parseInt(obj.total_runs) - parseInt(obj.legbye_runs) - parseInt(obj.bye_runs);
                       result[obj.bowler].runs =  result[obj.bowler].runs+totalruns;
                       //console.log(result);
                    } else {
                         result[obj.bowler].balls++;
                         totalruns = parseInt(obj.total_runs) - parseInt(obj.legbye_runs) - parseInt(obj.bye_runs);
                         result[obj.bowler].runs = result[obj.bowler].runs+totalruns;
                         //console.log(result);
                     }
                 }                  
            }
            } )
        } )
    //console.log(result);
    const array = [];
    const res = Object.keys(result);
    const res1 = Object.values(result);
    for (let i = 0; i < res.length; i++) {
        array[i] = [];
        array[i].push(res[i]);
        balls = res1[i].balls;
        runs =  res1[i].runs;
        let b = balls / 6;
        let r = runs / b;
        array[i].push(r);
    } 
    array.sort((a,b) => a[1] - b[1]);
    return array.slice(0,9);

}
console.log(noOfMatches(ddata));
console.log(noOfMatchesPerTeam(ddata));
console.log(extraRunsPerTeam(ddata,mdata));
console.log(econimicalBowlers(ddata,mdata));