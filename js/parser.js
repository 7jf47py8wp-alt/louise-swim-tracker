function parseCompetitionText(text, swimmer) {


    let competition = {

        naam: "Onbekende wedstrijd",
        datum: "",
        zwembad: "",
        gevonden: false,
        races: []

    };


    let upperText = text.toUpperCase();



    // -------------------------
    // Zoek Louise
    // -------------------------

    if(
        upperText.includes(swimmer.searchName)
    ){

        competition.gevonden = true;

    }



    // -------------------------
    // Wedstrijdnaam
    // -------------------------

    let lines =
    text.split("\n");


    for(let line of lines){

        line=line.trim();


        if(
            line.length > 10 &&
            !line.match(/programma/i)
        ){

            competition.naam=line;
            break;

        }

    }



    // -------------------------
    // Datum
    // -------------------------

    let dateMatch =
    text.match(
        /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/
    );


    if(dateMatch){

        competition.datum =
        dateMatch[0];

    }



    // -------------------------
    // Zwembad
    // -------------------------

    if(
        text.includes("50m")
    ){

        competition.zwembad="50m";

    }
    else if(
        text.includes("25m")
    ){

        competition.zwembad="25m";

    }



    // -------------------------
    // Disciplines
    // -------------------------

    let disciplines = [

        "vrije slag",
        "rugslag",
        "schoolslag",
        "vlinderslag",
        "wisselslag"

    ];



    for(let discipline of disciplines){


        let regex =
        new RegExp(
        "(\\d+)m\\s+"+discipline,
        "gi"
        );


        let matches =
        text.match(regex);



        if(matches){


            matches.forEach(item=>{


                competition.races.push({

                    discipline:item,
                    tijd:null,
                    pb:false

                });


            });


        }


    }


    return competition;

}