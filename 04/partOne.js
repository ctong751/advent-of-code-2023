async function calculatePoints() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/04/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let totalPoints = 0;

    for (let i = 0; i < lines.length; i++) {
	let winners = 0;
	if (!lines[i].split(": ")[1]) {
	    continue;
	}
	const cardData = lines[i].split(": ")[1].split(" | ");

	const winningNumbers = new Map()
	cardData[0].split(" ").forEach((number) => {
	    winningNumbers.set(number, true);
	});
	const myNumbers = cardData[1].split(" ");

	for (let j = 0; j < myNumbers.length; j++) {
	    if (myNumbers[j] && winningNumbers.has(myNumbers[j])) {
		winners += 1;
	    }
	}

	if (winners === 0) {
	    continue;
	}
	totalPoints += Math.pow(2, winners - 1);
    }

    console.log(totalPoints);
}

calculatePoints();
