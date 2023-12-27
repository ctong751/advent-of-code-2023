/**
 * @param []
 */
function tilt(platform) {
    let tiltedPlatform = [];
    for (let i = 0; i < platform.length; i++) {
	let col = platform[i].reverse();
	let newCol = [];
	let count = 0;
	let start = -1;
	let end = 0;
	for (let j = 0; j < col.length; j++) {
	    if (col[j] === "#") {
		end = j;

		if (start !== -1) {
		    let dots = j - start - count;
		    while (dots) {
			newCol.push(".");
			dots--;
		    }
		    while (count) {
			newCol.push("O");
			count--;
		    }
		}
		newCol.push("#");
		    
		start = -1;
		count = 0;
	    } else {
		if (start === -1) {
		    start = j;
		}
		if (col[j] === "O") {
		    count++;
		}
	    }
	}
	if (start !== -1) {
	    let dots = col.length - start - count;
	    while (dots) {
		newCol.push(".");
		dots--;
	    }
	    while (count) {
		newCol.push("O");
		count--;
	    }
	}
	tiltedPlatform.push(newCol.reverse());
    }
    return tiltedPlatform;
}

function calculateLoad(platform) {
    let distanceToSouthEdge = platform[0].length;
    let sum = 0;
    for (let i = 0; i < platform.length; i++) {
	for (let j = 0; j < distanceToSouthEdge; j++) {
	    if (platform[i][j] === "O") {
		sum += distanceToSouthEdge - j;
	    }
	}
    }
    return sum;
}

async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/14/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let platform = [];
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	let platformRow = lines[i].split("");
	platform[i] = platformRow;
    }

    let platformColumns = [];
    for (let i = 0; i < platform[0].length; i++) {
	let column = [];
	for (let j = 0; j < platform.length; j++) {
	    column.push(platform[j][i]);
	}
	platformColumns.push(column);
    }

    const tiltedPlatform = tilt(platformColumns);
    return calculateLoad(tiltedPlatform);
}

const answer = await solve();
console.log(answer);
