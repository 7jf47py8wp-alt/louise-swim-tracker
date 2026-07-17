async function loadSwimmer(){


    let response =
    await fetch("data/swimmer.json");


    return await response.json();

}





async function importPDF(){


const file =
document.getElementById("pdfUpload").files[0];


if(!file){

alert("Selecteer eerst een PDF");

return;

}



let swimmer =
await loadSwimmer();




const data =
await file.arrayBuffer();



const pdf =
await pdfjsLib.getDocument(data).promise;



let text="";



for(
let i=1;
i<=pdf.numPages;
i++
){


const page =
await pdf.getPage(i);



const content =
await page.getTextContent();



text += content.items
.map(item=>item.str)
.join("\n");


}




let competition =
parseCompetitionText(
text,
swimmer
);





if(!competition.gevonden){


document.getElementById("pdfResult")
.innerHTML =

`
<h3>❌ Louise niet gevonden</h3>

<p>
Geen wedstrijdnummer gevonden voor ${swimmer.lastName}.
</p>
`;


return;

}





document.getElementById("pdfResult")
.innerHTML =


`

<h3>✅ Louise gevonden</h3>

<p>
Wedstrijd:
${competition.naam}
</p>


<p>
Datum:
${competition.datum}
</p>


<p>
Zwembad:
${competition.zwembad}
</p>


<h4>Zwemnummers:</h4>

<ul>

${competition.races.map(r=>

`
<li>
${r.discipline}
</li>

`

).join("")}

</ul>

`;



console.log(competition);


}
