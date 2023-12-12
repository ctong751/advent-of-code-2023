function getPossibleArrangements(conditions, contiguous, contiguousIndex) {
    if (!conditions) {
	if (contiguous.length === 0 && contiguousIndex === 0) {
	    return 1;
	} else {
	    return 0;
	}
    }
    let possibleArrangements = 0;

    let possible;
    if (conditions[0] === "?") {
	possible = [".", "#"];
    } else {
	possible = [conditions[0]];
    }

    for (let i = 0; i < possible.length; i++) {
	if (possible[i] === "#") {
	    possibleArrangements += getPossibleArrangements(conditions.slice(1), contiguous, contiguousIndex + 1);
	} else {
	    if (contiguousIndex > 0) {
		if (contiguous && parseInt(contiguous[0]) === contiguousIndex) {
		    possibleArrangements += getPossibleArrangements(conditions.slice(1), contiguous.slice(1), 0);
		}
	    } else {
		possibleArrangements += getPossibleArrangements(conditions.slice(1), contiguous, 0);
	    }
	}
    }

    return possibleArrangements;
}
async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/12/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let conditionRecords = [];
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	let [conditions, contiguous] = lines[i].split(" ");
	conditionRecords.push({
	    conditions: conditions,
	    contiguous: contiguous.split(","),
	});
    }

    let sum = 0;
    for (let i = 0; i < conditionRecords.length; i++) {
	let conditions = [];
	let contiguous = [];
	for (let j = 0; j < 5; j++) {
	    conditions.push(conditionRecords[i].conditions);
	    for (let k = 0; k < conditionRecords[i].contiguous.length; k++) {
		contiguous.push(conditionRecords[i].contiguous[k]);
	    }
	}
	let unfoldedConditions = conditions.join("?");
	sum += getPossibleArrangements(unfoldedConditions + ".", contiguous, 0);
    }

    return sum;
}

const answer = await solve();
console.log(answer);
