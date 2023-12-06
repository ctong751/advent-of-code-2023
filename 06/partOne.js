function parseLine(line) {
    const lineData = line.split(":")[1].trim().split(" ");
    let parsedLine = [];
    for (let i = 0; i < lineData.length; i++) {
	if (lineData[i] === "") {
	    continue;
	}
	parsedLine.push(parseInt(lineData[i]));
    }
    return parsedLine;
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

async function partOne() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/06/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    const raceDurations = parseLine(lines[0]);
    const recordDistances = parseLine(lines[1]);

    let waysToWin = [];
    let answer = 1;
    for (let i = 0; i < raceDurations.length; i++) {
	const winningCombinations = getWinningCombinations(raceDurations[i], recordDistances[i]);
	waysToWin.push(winningCombinations);
	answer *= winningCombinations.length;
    }
    console.log(answer);
}
partOne();
