function parseCompetition(text) {

    const competition = {
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        poolLength: null
    };

    // Alle regels
    const lines = text
        .split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0);

    // ---------- Wedstrijdnaam ----------
    for (let line of lines) {

        if (
            line.includes("BK") ||
            line.includes("Belgische") ||
            line.includes("Championnats") ||
            line.includes("Jeugdkampioenschappen")
        ) {

            competition.name = line;
            break;
        }

    }

    // ---------- Locatie + data ----------
    for (let line of lines) {

        const match =
            line.match(/^(.+?),\s*(\d{1,2})\s*-\s*(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

        if (match) {

            competition.location = match[1].trim();

            const month = match[4];
            const year = match[5];

            competition.startDate =
                `${year}-${month.padStart(2, "0")}-${match[2].padStart(2, "0")}`;

            competition.endDate =
                `${year}-${month.padStart(2, "0")}-${match[3].padStart(2, "0")}`;

            break;
        }

    }

    // ---------- Zwembad ----------
    if (text.includes("50m")) {

        competition.poolLength = 50;

    } else if (text.includes("25m")) {

        competition.poolLength = 25;

    }

    return competition;

}
