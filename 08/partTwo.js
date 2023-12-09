const directions = new Map();
directions.set("L", 0);
directions.set("R", 1);

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);   
}

async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/08/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let leftRight;
    let nodeMap = new Map();
    let startingNodes = [];
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
	if (node[2] === "A") {
	    startingNodes.push(node);
	}
    }

    let shortestPaths = [];
    for (let i = 0; i < startingNodes.length; i++) {
	let lrIndex = 0;
	let steps = 0;
	while (startingNodes[i][2] !== "Z") {
	    if (lrIndex === leftRight.length) {
		lrIndex = 0;
	    }
	    const direction = directions.get(leftRight[lrIndex++]);
	    startingNodes[i] = nodeMap.get(startingNodes[i])[direction];
	    steps++;
	}
	shortestPaths.push(steps);
    }
    
    let leastCommonMultiple = shortestPaths[0];
    for (let i = 1; i < shortestPaths.length; i++) {
	leastCommonMultiple = lcm(leastCommonMultiple, shortestPaths[i]);
    }

    return leastCommonMultiple;
}

const answer = await solve();
console.log(answer);
