async function parseDoc() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/01/input.txt");
    const fileContents = await file.text();
    const lines = fileContents.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
	let line = lines[i];
	let num = 0;
	for (let j = 0; j < lines.length; j++) {
	    let char = Number.parseInt(line[j]);
	    if (Number.isInteger(char)) {
		num += char * 10;
		break;
	    }
	}
	for (let j = lines.length; j >= 0; j--) {
	    let char = Number.parseInt(line[j]);
	    if (Number.isInteger(char)) {
		num += char;
		break;
	    }
	}
	total += num;
    }
    console.log(total);
}

parseDoc();
