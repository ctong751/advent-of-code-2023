const directions = new Map();
directions.set("L", 0);
directions.set("R", 1);

async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/08/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let leftRight;
    let nodeMap = new Map();
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	if (i === 0) {
	    leftRight = lines[i].split("");
	    continue;
	}

	const [node, intersection] = lines[i].split(" = ");
	let options = intersection.split(", ");
	options[0] = options[0].substring(1);
	options[1] = options[1].substring(0, options[1].length - 1);
	nodeMap.set(node, options);
    }

    let currentNode = "AAA";
    let lrIndex = 0;
    let steps = 0;
    while (currentNode !== "ZZZ") {
	if (lrIndex === leftRight.length) {
	    lrIndex = 0;
	}
	currentNode = nodeMap.get(currentNode)[directions.get(leftRight[lrIndex++])];
	steps++;
    }
    return steps;
}

const answer = await solve();
console.log(answer);
