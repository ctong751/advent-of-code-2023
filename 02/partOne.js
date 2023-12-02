function isPossibleGame(line) {
    const maxCubes = new Map();
    maxCubes["red"] = 12;
    maxCubes["green"] = 13;
    maxCubes["blue"] = 14;

    const game = line.split(": ");
    if (game[1] === undefined) {
	return 0;
    }
    const gameNumber = game[0].split(" ")[1];
    const cubeSets = game[1].split("; ");

    for (let i = 0; i < cubeSets.length; i++) {
	const cubeSubsets = cubeSets[i].split(", ");
	for (let j = 0; j < cubeSubsets.length; j++) {
	    const cubes = cubeSubsets[j].split(" ");
	    for (let k = 0; k < cubes.length; k++) {
		const count = cubes[0];
		const color = cubes[1];
		if (maxCubes[color] < count) {
		    return 0;
		}
	    }
	}
    }
    return Number.parseInt(gameNumber);
}

async function getPossibleGames() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/02/input.txt");
    const fileContents = await file.text();
    const lines = fileContents.split("\n");
    let possibleGames = 0;
    for (let i = 0; i < lines.length; i++) {
	possibleGames += isPossibleGame(lines[i]);
    }
    console.log(possibleGames);
}

getPossibleGames();
