function getMirrorIndex(line, original) {
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
	    if (original - 1 !== i) {
		mirrorIndex = i;
		break;
	    }
	}
    }
    return mirrorIndex + 1;
}

function evaluateRows(pattern, original) {
    let og = original;
    if (original >= 100) {
	og = original / 100;
    }
    let rows = [];
    for (let i = 0; i < pattern.length; i++) {
	rows.push(pattern[i].join(""));
    }
    
    const mirror = getMirrorIndex(rows, og);
    return mirror ?? 0;
}

function evaluateColumns(pattern, original) {
    let og = original;
    if (original >= 100) {
	og = 0;
    }
    let cols = [];
    for (let i = 0; i < pattern[0].length; i++) {
	let col = "";
	for (let j = 0; j < pattern.length; j++) {
	    col += pattern[j][i];
	}
	cols.push(col);
    }
    const mirror = getMirrorIndex(cols, og);
    return mirror ?? 0;
}

function evaluatePattern(pattern, original) {
    let cols = evaluateColumns(pattern, original);
    let rows = evaluateRows(pattern, original) * 100;
    if (cols === original) {
	cols = 0;
    }
    if (rows === original) {
	rows = 0;
    }
    return cols + rows;
}

function evaluateAlternates(pattern, original) {
    for (let j = 0; j < pattern.length; j++) {
	for (let k = 0; k < pattern[j].length; k++) {
	    let copy = JSON.parse(JSON.stringify(pattern));
	    copy[j][k] = copy[j][k] === "." ? "#" : ".";
	    let newSum = evaluatePattern(copy, original);
	    if (newSum > 0) {
		return newSum;
	    }
	}
    }
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
	    let original = evaluatePattern(pattern, 0);
	    sum += evaluateAlternates(pattern, original);
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
