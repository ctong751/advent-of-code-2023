function validLine(line, coords) {
    let valid = false;
    line.forEach((coord) => {
	if (Math.abs(coords.start - coord) < 2 || Math.abs(coords.end - coord) < 2 || (coords.start <= coord && coords.end >= coord)) {
	    valid = true
	}
    });
    return valid;
}

function isValidPartNumber(partNumber, specialChars, lineNumber) {
    let valid = false;
    if (lineNumber !== 0) {
	if (validLine(specialChars.get(lineNumber - 1), partNumber.partCoords)) {
	    valid = true;
	}
    }
    if (lineNumber !== specialChars.size) {
	if (validLine(specialChars.get(lineNumber + 1), partNumber.partCoords)) {
	    valid = true;
	}
    }
    if (validLine(specialChars.get(lineNumber), partNumber.partCoords)) {
	valid = true
    }
    return valid;
}


async function getPartNumbersSum() {
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
    
    let validPartNumbers = [];
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
		    linePartNumbers.push(
			{
			    partNumber: parseInt(partNumber), 
			    partCoords: {start: start, end: j - 1},
			}
		    );
		}

		partNumber = "";
		continue;
	    }

	    partNumber += lines[i][j];
	}


	linePartNumbers.forEach((partNumber) => {
	    if (isValidPartNumber(partNumber, specialChars, i)) {
		sum += partNumber.partNumber;
	    }
	});
    }
    console.log(sum);

}

getPartNumbersSum();
