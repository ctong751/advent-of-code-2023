function getNextInSequence(sequence) {
    let allZeros = true;
    for (let i = 0; i < sequence.length; i++) {
	if (sequence[i] !== 0) {
	    allZeros = false;
	    break;
	}
    }
    if (allZeros) {
	return 0;
    }

    let resultSequence = [];
    let currentVal = sequence[0];
    for (let i = 1; i < sequence.length; i++) {
	resultSequence.push(sequence[i] - currentVal);
	currentVal = sequence[i];
    }
    return sequence[[0] - getNextInSequence(resultSequence);
}
async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/09/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	const history = lines[i].split(" ").map(x => parseInt(x));
	sum += getNextInSequence(history);
    }

    return sum;
}

const answer = await solve();
console.log(answer);
