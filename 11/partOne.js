async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/11/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let rowsWithoutGalaxy = [];
    let universe = [];
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
	    }
	}
	if (!hasGalaxy) {
	    rowsWithoutGalaxy.push(i);
	}
    }

    const columnsLength = universe[0].length;
    let columnsWithoutGalaxy = [];
    for (let i = 0; i < columnsLength; i++) {
	let hasGalaxy = false;
	for (let j = 0; j < universe.length; j++) {
	    if (universe[j][i] === "#") {
		hasGalaxy = true;
	    }
	}
	if (!hasGalaxy) {
	    columnsWithoutGalaxy.push(i);
	}
    }

    let newUniverse = [];
    for (let i = 0; i < universe.length; i++) {
	let row = universe[i];
	let insertedCols = 0;
	if (rowsWithoutGalaxy.includes(i)) {
	    newUniverse.push(row);
	} else {
	    for (let j = 0; j < universe[i].length; j++) {
		if (columnsWithoutGalaxy.includes(j)) {
		    row = [...row.slice(0, j + insertedCols), ".", ...row.slice(j + insertedCols)];
		    insertedCols++
		}
	    }
	}
	newUniverse.push(row);
    }

    let galaxies = new Map();
    let galaxyCount = 0;
    for (let i = 0; i < newUniverse.length; i++) {
	for (let j = 0; j < newUniverse[i].length; j++) {
	    if (newUniverse[i][j] === "#") {
		galaxies.set(galaxyCount++, [i, j]);
	    }
	}
    }

    let sum = 0;
    for (let i = 0; i < galaxyCount; i++) {
	let galaxy = galaxies.get(i);
	for (let j = i; j < galaxyCount; j++) {
	    let otherGalaxy = galaxies.get(j);
	    sum += Math.abs(galaxy[0] - otherGalaxy[0]) + Math.abs(galaxy[1] - otherGalaxy[1]);
	}
    }

    return sum;
}

const answer = await solve();
console.log(answer);
