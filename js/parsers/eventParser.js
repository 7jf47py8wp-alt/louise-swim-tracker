function parseEvents(text) {

    const events = [];

    const lines = text.split("\n");

    let currentEvent = null;

    for (let line of lines) {

        line = line.trim();

        // Programmanummer
        const eventMatch =
            line.match(/Programmanr\.?\/?Epreuve\s+(\d+)/i);

        if (eventMatch) {

            if (currentEvent) {
                events.push(currentEvent);
            }

            currentEvent = {

                eventNumber: parseInt(eventMatch[1]),

                distance: null,

                stroke: "",

                gender: "",

                ageGroup: "",

                date: "",

                startTime: ""

            };

            continue;

        }

        if (!currentEvent)
            continue;

        // Discipline

        const distanceMatch =
            line.match(/(\d+)m\s+(.*)/i);

        if (distanceMatch && currentEvent.distance == null) {

            currentEvent.distance =
                parseInt(distanceMatch[1]);

            currentEvent.stroke =
                distanceMatch[2];

        }

        // Datum + uur

        const dateMatch =
            line.match(/(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}:\d{2})/);

        if (dateMatch) {

            currentEvent.date =
                dateMatch[1];

            currentEvent.startTime =
                dateMatch[2];

        }

    }

    if (currentEvent)
        events.push(currentEvent);

    return events;

}
