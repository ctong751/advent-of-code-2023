/**
 * @param {string} line
 * @return {number}
 */
function getCalibrationValue(line) {
    const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let num = 0;
    let queue = [];
    for (let j = 0; j < line.length; j++) {
	let char = line[j];
	if (Number.isInteger(Number.parseInt(char))) {
	    num += Number.parseInt(char) * 10;
	    break;
	} else {
	    queue.push(char);
	    for (let k = 0; k < digits.length; k++) {
		if (queue.join("").includes(digits[k])) {
		    num += (k + 1) * 10;
		    break;
		}
	    }
	    if (num > 0) {
		break;
	    }
	}
    }
    queue = [];
    for (let j = line.length; j >= 0; j--) {
	let char = line[j];
	if (Number.isInteger(Number.parseInt(char))) {
	    num += Number.parseInt(char);
	    break;
	} else {
	    queue.unshift(char);
	    for (let k = 0; k < digits.length; k++) {
		if (queue.join("").includes(digits[k])) {
		    num += (k + 1);
		    break;
		}
	    }
	    if (num % 10 > 0) {
		break;
	    }
	}
    }
    return num;
}

async function parseDoc() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/01/input.txt");
    const fileContents = await file.text();
    const lines = fileContents.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
	total += getCalibrationValue(lines[i]);
    }
    console.log(total);
}

parseDoc();
