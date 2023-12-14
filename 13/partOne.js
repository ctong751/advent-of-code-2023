function getMirrorIndex(line) {
    let mirrorIndex = -1;
    for (let i = 0; i < line.length - 1; i++) {
	let beforeIndex = i;
	let afterIndex = i + 1;
	let symmetrical = true;
	while (beforeIndex >= 0 && afterIndex < line.length) {
	    if (line[beforeIndex--] === line[afterIndex++]) {
		continue;
	    } else {
		symmetrical = false;
	    }
	}
	if (symmetrical) {
	    mirrorIndex = i;
	    break;
	}
    }
    return mirrorIndex + 1;
}
function evaluateRows(pattern) {
    let rows = [];
    for (let i = 0; i < pattern.length; i++) {
	rows.push(pattern[i].join(""));
    }
    
    const mirror = getMirrorIndex(rows);
    return mirror ?? 0;
}

function evaluateColumns(pattern) {
    let cols = [];
    for (let i = 0; i < pattern[0].length; i++) {
	let col = "";
	for (let j = 0; j < pattern.length; j++) {
	    col += pattern[j][i];
	}
	cols.push(col);
    }
    const mirror = getMirrorIndex(cols);
    return mirror ?? 0;
}


function evaluatePattern(pattern) {
    let sum = evaluateColumns(pattern);
    if (sum === 0) {
	sum = evaluateRows(pattern) * 100;
    }
    return sum;
}
async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/13/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let pattern = [];
    let patternIndex = 0;
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    sum += evaluatePattern(pattern);
	    pattern = [];
	    patternIndex = 0;
	    continue;
	}

	pattern[patternIndex] = [];
	for (let j = 0; j < lines[i].length; j++) {
	    pattern[patternIndex][j] = lines[i][j];
	}
	patternIndex++;
    }
    return sum;
}

const answer = await solve();
console.log(answer);
