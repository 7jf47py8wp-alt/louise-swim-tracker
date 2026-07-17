async function importPDF(){

const file =
document.getElementById("pdfUpload").files[0];


if(!file){
alert("Selecteer eerst een PDF");
return;
}


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
.join(" ");

}


let competition =
parseCompetitionText(text);


document.getElementById("pdfResult")
.innerHTML =

`

<h3>${competition.naam}</h3>

<p>
Datum: ${competition.datum}
</p>

<p>
Zwembad: ${competition.zwembad}
</p>

<h4>Programma:</h4>

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