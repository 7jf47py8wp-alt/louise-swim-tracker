function parseCompetitionText(text) {


    let competition = {

        naam: "Onbekende wedstrijd",
        datum: "",
        zwembad: "",
        races: []

    };


    // -------------------------
    // Wedstrijdnaam herkennen
    // -------------------------

    let lines = text.split("\n");


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
    // Datum herkennen
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
    // Zwembad herkennen
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
    // Disciplines herkennen
    // -------------------------

    let disciplines = [

        "vrije slag",
        "rugslag",
        "schoolslag",
        "vlinderslag",
        "wisselslag"

    ];



    for(let d of disciplines){


        let regex =
        new RegExp(
        "(\\d+)m\\s+"+d,
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