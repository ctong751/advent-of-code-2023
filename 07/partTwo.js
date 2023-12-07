const cardTypes = new Map();
cardTypes.set("2", 2);
cardTypes.set("3", 3);
cardTypes.set("4", 4);
cardTypes.set("5", 5);
cardTypes.set("6", 6);
cardTypes.set("7", 7);
cardTypes.set("8", 8);
cardTypes.set("9", 9);
cardTypes.set("T", 10);
cardTypes.set("J", 1);
cardTypes.set("Q", 12);
cardTypes.set("K", 13);
cardTypes.set("A", 14);

function determineRank(hand) {
    let pairs = new Map();
    for (let i = 2; i < 15; i++) {
	let card;
	switch (i) {
	    case 10:
		card = "T";
		break;
	    case 11:
		card = "J";
		break;
	    case 12:
		card = "Q";
		break;
	    case 13:
		card = "K";
		break;
	    case 14:
		card = "A";
		break;
	    default:
		card = i.toString();
		break;
	}
	pairs.set(card, 0);
    }

    for (let i = 0; i < hand.length; i++) {
	const card = hand[i];
	pairs.set(card, pairs.get(card) + 1);
    }

    let handType = 0;

    let pairsByCount = new Map();
    pairs.forEach((value, key) => {
	if (key === "J") {
	    return;
	}
	let count = [];
	if (pairsByCount.get(value)) {
	    count = pairsByCount.get(value);
	}
	count.push(key);
	pairsByCount.set(value, count);
    });

    let jCount = pairs.get("J");
    for (let i = 5; i >= 0; i--) {
	if (pairsByCount.get(i)) {
	    for (let j = 0; j < pairsByCount.get(i).length; j++) {
		if (i + jCount >= 5) {
		    return 6;
		} else if (i + jCount === 4) {
		    return 5;
		} else if (i + jCount === 3) {
		    handType = 3;
		    jCount -= 3 - i;
		} else if (i + jCount === 2 && handType < 4) {
		    handType += 1;
		    jCount -= 2 - i;
		}
	    }
	}
    }

    return handType;
}

async function getTotalWinnings() {
    const file = await fetch("file:///Users/ctong751/repos/advent-of-code-2023/07/input.txt");
    const data = await file.text();
    const lines = data.split("\n");

    let hands = [];
    for (let i = 0; i < lines.length; i++) {
	if (lines[i] === "") {
	    continue;
	}
	const [ hand, bid ] = lines[i].split(" ");
	const rank = determineRank(hand);
	hands.push(
	    {
		hand: hand, 
		bid: parseInt(bid),
		rank: rank,
	    }
	);
    }

    hands = hands.sort((a, b) => {
	if (a.rank === b.rank) {
	    for (let i = 0; i < a.hand.length; i++) {
		const aCard = cardTypes.get(a.hand[i]);
		const bCard = cardTypes.get(b.hand[i]);
		if (aCard === bCard) {
		    continue;
		}
		return aCard - bCard;	    
	    }
	}
	return a.rank - b.rank;
    });

    let winnings = 0;
    for (let i = 0; i < hands.length; i++) {
	winnings += hands[i].bid * (i + 1);
    }
    return winnings;
}
const winnings = await getTotalWinnings();
console.log(winnings);
