async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/11/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let columnsWithoutGalaxy = new Map();
    let rowsWithoutGalaxy = new Map();
    let universe = [];
    let galaxies = new Map();
    let galaxyCount = 0;
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	let line = lines[i].split("");
	universe.push(line);
	let hasGalaxy = false;
	for (let j = 0; j < line.length; j++) {
	    if (line[j] === "#") {
		hasGalaxy = true;
		galaxies.set(galaxyCount++, [i, j]);
	    }
	}
	if (!hasGalaxy) {
	    rowsWithoutGalaxy.set(i, true);
	}
    }

    const columnsLength = universe[0].length;
    for (let i = 0; i < columnsLength; i++) {
	let hasGalaxy = false;
	for (let j = 0; j < universe.length; j++) {
	    if (universe[j][i] === "#") {
		hasGalaxy = true;
	    }
	}
	if (!hasGalaxy) {
	    columnsWithoutGalaxy.set(i, true);
	}
    }

    let sum = 0;
    const expansionDistance = 1000000;
    for (let i = 0; i < galaxyCount; i++) {
	let galaxy = galaxies.get(i);
	for (let j = i; j < galaxyCount; j++) {
	    let otherGalaxy = galaxies.get(j);
	    let startX = Math.min(galaxy[0], otherGalaxy[0]);
	    let endX = Math.max(galaxy[0], otherGalaxy[0]);
	    let xDistance = 0;
	    for (let k = startX; k < endX; k++) {
		if (rowsWithoutGalaxy.has(k)) {
		    sum += expansionDistance;
		} else {
		    sum++;
		}
	    }
	    let startY = Math.min(galaxy[1], otherGalaxy[1]);
	    let endY = Math.max(galaxy[1], otherGalaxy[1]);
	    for (let k = startY; k < endY; k++) {
		if (columnsWithoutGalaxy.has(k)) {
		    sum += expansionDistance;
		} else {
		    sum++;
		}
	    }
	}
    }

    return sum;
}

const answer = await solve();
console.log(answer);
