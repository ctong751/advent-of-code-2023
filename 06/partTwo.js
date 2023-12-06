function parseLine(line) {
    const lineData = line.split(":")[1].trim().split(" ");
    let parsedLine = 0;
    for (let i = 0; i < lineData.length; i++) {
	if (lineData[i] === "") {
	    continue;
	}
	parsedLine += lineData[i];
    }
    return parseInt(parsedLine);
}

function getWinningCombinations(raceDuration, recordDistance) {
    let winningWays = [];
    for (let i = 0; i < raceDuration; i++) {
	const distance = i * (raceDuration - i);
	if (distance > recordDistance) {
	    winningWays.push(i);
	}
    }
    return winningWays;
}

async function partTwo() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/06/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    const raceDuration = parseLine(lines[0]);
    const recordDistance = parseLine(lines[1]);

    const winningCombinations = getWinningCombinations(raceDuration, recordDistance);
    console.log(winningCombinations.length);
}
partTwo();
