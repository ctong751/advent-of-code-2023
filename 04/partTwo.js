async function calculatePoints() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/04/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let scratchcards = new Map();
    // Add original scratchcards
    for (let i = 0; i < lines.length - 1; i++) {
	scratchcards.set(i, 1);
    }

    for (let i = 0; i < lines.length; i++) {
	if (!lines[i].split(": ")[1]) {
	    continue;
	}
	const cardData = lines[i].split(": ")[1].split(" | ");

	const winningNumbers = new Map()
	cardData[0].split(" ").forEach((number) => {
	    winningNumbers.set(number, true);
	});
	const myNumbers = cardData[1].split(" ");

	let cardWinners = 0;
	for (let j = 0; j < myNumbers.length; j++) {
	    if (myNumbers[j] && winningNumbers.has(myNumbers[j])) {
		cardWinners += 1;
	    }
	}

	if (cardWinners === 0) {
	    continue;
	}

	for (let j = 1; j <= cardWinners; j++) {
	    for (let k = 0; k < scratchcards.get(i); k++) {
		if (!scratchcards.has(i + j)) {
		    break;
		}
		scratchcards.set(i + j, scratchcards.get(i + j) + 1);
	    }
	}
    }

    let totalScratchcards = 0;
    scratchcards.forEach((value) => {
	totalScratchcards += value;
    });

    console.log(totalScratchcards);
}

calculatePoints();
