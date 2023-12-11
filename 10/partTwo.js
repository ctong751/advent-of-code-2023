let grid = [];
let loopCoords = [];

function isInside(x, y) {
    if (partOfLoop(x, y)) {
	return false;
    }
    let boundaries = 0;
    for (let i = x + 1; i < grid.length; i++) {
	if (partOfLoop(i, y) && (grid[i][y] === "-" || grid[i][y] === "F" || grid[i][y] === "L" || grid[i][y] === "S")) {
	    boundaries++;
	}
    }
    return (boundaries % 2 === 1);
}

function partOfLoop(x, y) {
    if (loopCoords.find((coord) => {
	if (coord[0] === x && coord[1] === y) {
	    return true;
	}
    })) {
	return true;
    } else {
	return false;
    }
}

function getNextDirection(x, y, direction) {
    if (grid[x][y] === "S") {
	return "done";
    }
    switch (direction) {
	case "up":
	    if (grid[x][y] === "|") {
		return "up";
	    } else if (grid[x][y] === "7") {
		return "left";
	    } else if (grid[x][y] === "F") {
		return "right";
	    }
	    return "";
	case "down":
	    if (grid[x][y] === "|") {
		return "down";
	    } else if (grid[x][y] === "J") {
		return "left";
	    } else if (grid[x][y] === "L") {
		return "right";
	    }
	    return "";
	case "left":
	    if (grid[x][y] === "-") {
		return "left";
	    } else if (grid[x][y] === "F") {
		return "down";
	    } else if (grid[x][y] === "L") {
		return "up";
	    }
	    return "";
	case "right":
	    if (grid[x][y] === "-") {
		return "right";
	    } else if (grid[x][y] === "7") {
		return "down";
	    } else if (grid[x][y] === "J") {
		return "up";
	    }
	    return "";
    }
}
async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/10/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let startCoords;
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	const currentLine = lines[i].split("");
	grid.push(currentLine);
	for (let j = 0; j < currentLine.length; j++) {
	    if (currentLine[j] === "S") {
		startCoords = [i, j];
	    }
	}
    }

    let direction = "right";
    let currentCoords = [startCoords[0], startCoords[1] + 1];
    let steps = 0;
    let nextDirection = getNextDirection(currentCoords[0], currentCoords[1], direction);
    loopCoords.push([startCoords[0], startCoords[1]]);
    while (nextDirection !== "done") {
	if (nextDirection === "") {
	    if (direction === "up") {
		direction = "right";
		currentCoords[0]++;
		currentCoords[1]++;
	    } else if (direction === "right") {
		direction = "down";
		currentCoords[0]++;
		currentCoords[1]--;
	    } else if (direction === "down") {
		direction = "left";
		currentCoords[0]--;
		currentCoords[1]--;
	    } else {
		return steps;
	    }
	} else {
	    direction = nextDirection;
	    loopCoords.push([currentCoords[0], currentCoords[1]]);
	    if (direction === "up") {
		currentCoords[0]--;
	    }
	    if (direction === "down") {
		currentCoords[0]++;
	    }
	    if (direction === "left") {
		currentCoords[1]--;
	    }
	    if (direction === "right") {
		currentCoords[1]++;
	    }
	    steps++;
	}
	nextDirection = getNextDirection(currentCoords[0], currentCoords[1], direction);
    }

    let totalInside = 0;
    for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
	    if (isInside(i, j)) {
		totalInside++;
	    }
	}
    }
    return totalInside;
}

const answer = await solve();
console.log(answer);
