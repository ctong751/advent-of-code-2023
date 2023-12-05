async function getLowestLocationNumber() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/05/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let seeds = [];
    let mappings = [];

    let currentMap;

    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}

	// Seeds
	if (i === 0) {
	    const seedsString = lines[i].split(": ")[1];
	    seeds = seedsString.split(" ");
	    continue;
	}

	// if line contains ":", its a heading and we can skip
	if (lines[i].includes(":")) {
	    if (currentMap === undefined) {
		currentMap = 0;
	    } else {
		currentMap++;
	    }
	    mappings[currentMap] = [];
	    continue;
	}

	// Split line into array
	let [ destinationRangeStart, sourceRangeStart, rangeLength ] = lines[i].split(" ");
	mappings[currentMap].push({
	    diff: parseInt(destinationRangeStart) - parseInt(sourceRangeStart),
	    sourceRangeStart: parseInt(sourceRangeStart),
	    rangeLength: parseInt(rangeLength)
	});
    }

    // loop through seeds
    let lowest;
    for (let i = 0; i < seeds.length; i++) {
	let seed = parseInt(seeds[i]);
	for (let j = 0; j <= currentMap; j++) {
	    for (let k = 0; k < mappings[j].length; k++) {
		if (seed >= mappings[j][k].sourceRangeStart && seed <= mappings[j][k].sourceRangeStart + mappings[j][k].rangeLength) {
		    seed += mappings[j][k].diff;	    
		    break;
		}
	    }
	}

	if (lowest === undefined || seed < lowest) {
	    lowest = seed;
	}
    }

    console.log(lowest);
}

getLowestLocationNumber();
