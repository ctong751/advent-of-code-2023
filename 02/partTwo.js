function getPower(line) {
    const maxCubes = new Map();
    maxCubes["red"] = 0;
    maxCubes["green"] = 0;
    maxCubes["blue"] = 0;

    const game = line.split(": ");
    if (game[1] === undefined) {
	return 0;
    }
    const cubeSets = game[1].split("; ");

    for (let i = 0; i < cubeSets.length; i++) {
	const cubeSubsets = cubeSets[i].split(", ");
	for (let j = 0; j < cubeSubsets.length; j++) {
	    const cubes = cubeSubsets[j].split(" ");
	    for (let k = 0; k < cubes.length; k++) {
		const count = Number.parseInt(cubes[0]);
		const color = cubes[1];
		if (maxCubes[color] < count) {
		    maxCubes[color] = count;
		}
	    }
	}
    }
    const power = maxCubes["red"] * maxCubes["green"] * maxCubes["blue"];
    return power;
}

async function getPossibleGames() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/02/input.txt");
    const fileContents = await file.text();
    const lines = fileContents.split("\n");
    let possibleGames = 0;
    for (let i = 0; i < lines.length; i++) {
	possibleGames += getPower(lines[i]);
    }
    console.log(possibleGames);
}

getPossibleGames();
