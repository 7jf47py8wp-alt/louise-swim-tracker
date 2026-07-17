let races = JSON.parse(localStorage.getItem("louiseRaces")) || [];


function save(){

localStorage.setItem(
"louiseRaces",
JSON.stringify(races)
);

}


function convertTime(time){

let parts=time.split(":");

if(parts.length===2){

return Number(parts[0])*60 + Number(parts[1]);

}

return Number(time);

}



function addRace(){

let race={

event:
document.getElementById("eventName").value,

date:
document.getElementById("date").value,

stroke:
document.getElementById("stroke").value,

time:
document.getElementById("time").value,

pb:false

};


let previous =
races.filter(r=>r.stroke===race.stroke);


if(previous.length===0){

race.pb=true;

}
else{

let best=Math.min(
...previous.map(r=>convertTime(r.time))
);

if(convertTime(race.time)<best){

race.pb=true;

}

}


races.push(race);

save();

render();

}



function render(){

let table =
document.getElementById("raceTable");

table.innerHTML="";


races.forEach(r=>{


let row=document.createElement("tr");


row.innerHTML=`

<td>${r.date}</td>
<td>${r.stroke}</td>
<td>${r.time}</td>
<td>${r.pb?"⭐":"-"}</td>

`;


table.appendChild(row);


});


document.getElementById("raceCount").innerHTML =
new Set(races.map(r=>r.event)).size;


document.getElementById("performanceCount").innerHTML =
races.length;


document.getElementById("pbCount").innerHTML =
races.filter(r=>r.pb).length;


}


render();