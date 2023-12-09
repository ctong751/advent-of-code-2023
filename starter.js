async function solve() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/08/input-2.txt");
    const data = await file.text();
    const lines = data.split("\n");

    for (let i = 0; i < lines.length; i++) {
	// Do something
    }
}

const answer = await solve();
console.log(answer);
