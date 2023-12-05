


// 1. Find all gears (*s) and their coordinates
// 2. Find all part numbers and their coordinates
// 3. For each gear, find the adjacent part numbers
// 4. If part numbers list has 2 parts, multiply together and store in gearRatio
// 5. sum gearRatios
//

function getAdjacentPartNumbers(gear, partNumbers) {
    const adjacentPartNumbers = partNumbers.filter((partNumber) => {
	let start = partNumber.partCoords.start.y;
	let end = partNumber.partCoords.start.y;
	if (gear.y !== 0) {
	    start = partNumber.partCoords.start.y - 1;
	}
	if (gear.y !== partNumbers.length - 1) {
	    end = partNumber.partCoords.start.y + 1;
	}

	for (let i = start; i <= end; i++) {
	    if (i !== gear.y) {
		continue;
	    }

	    if (Math.abs(partNumber.partCoords.start.x - gear.x) < 2 || 
		Math.abs(partNumber.partCoords.end.x - gear.x) < 2 || 
		(partNumber.partCoords.start.x <= gear.x && partNumber.partCoords.end.x >= gear.x)) {
		return true;
	    }
	}
	return false;
    });
    return adjacentPartNumbers;
}

async function getGearRatioSum() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/03/input.txt");
    const text = await file.text();
    const lines = text.split("\n");

    let sum = 0;

    let specialChars = new Map();
    for (let i = 0; i < lines.length; i++) {
	let line = [];
	for (let j = 0; j < lines[i].length; j++) {
	    if (isNaN(lines[i][j]) && lines[i][j] !== ".") {
		line.push(j);
	    }
	}
	specialChars.set(i, line);
    }

    let gears = [];
    for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
	    if (lines[i][j] === "*") {
		gears.push({x: j, y: i});
	    }
	}
    }
    
    let partNumbers = [];
    for (let i = 0; i < lines.length; i++) {
	let linePartNumbers = [];
	let partNumber = "";
	let start = 0;
	for (let j = 0; j < lines[i].length; j++) {
	    if (partNumber === "") {
		start = j;
	    }
	    if (lines[i].length - 1 === j) {
		partNumber += lines[i][j];
	    }
	    if (specialChars.get(i).includes(j) || lines[i][j] === "." || lines[i].length - 1 === j) {
		if (partNumber !== "") {
		    partNumbers.push(
			{
			    partNumber: parseInt(partNumber), 
			    partCoords: {start: {x: start, y: i}, end: {x: j - 1, y: i}},
			}
		    );
		}

		partNumber = "";
		continue;
	    }

	    partNumber += lines[i][j];
	}
    }


    gears.forEach((gear) => {
	const adjacentPartNumbers = getAdjacentPartNumbers(gear, partNumbers);
	if (adjacentPartNumbers.length === 2) {
	    sum += adjacentPartNumbers[0].partNumber * adjacentPartNumbers[1].partNumber;
	}
    });

    console.log(sum);

}

getGearRatioSum();
