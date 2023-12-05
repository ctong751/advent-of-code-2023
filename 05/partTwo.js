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
	    const seedData = seedsString.split(" ");
	    let currentSeed;
	    for (let j = 0; j < seedData.length; j++) {
		if (j % 2 === 0) {
		    currentSeed = parseInt(seedData[j]);
		} else {
		    seeds.push({ seed: currentSeed, range: parseInt(seedData[j]) });
		}
	    }
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

    let lowest;
    for (let i = 0; i < seeds.length; i++) {
	for (let j = 0; j < seeds[i].range; j++) {
	    let seed = seeds[i].seed + j;
	    for (let k = 0; k <= currentMap; k++) {
		for (let l = 0; l < mappings[k].length; l++) {
		    if (seed >= mappings[k][l].sourceRangeStart && seed <= mappings[k][l].sourceRangeStart + mappings[k][l].rangeLength) {
			seed += mappings[k][l].diff;	    
			break;
		    }
		}
	    }
	    if (lowest === undefined || seed < lowest) {
		lowest = seed;
	    }
	}
    }

    console.log(lowest);
}

getLowestLocationNumber();
