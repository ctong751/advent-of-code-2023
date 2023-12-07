const handTypes = new Map();
handTypes.set(0, "High Card");
handTypes.set(1, "One Pair");
handTypes.set(2, "Two Pair");
handTypes.set(3, "Three of a Kind");
handTypes.set(4, "Full House");
handTypes.set(5, "Four of a Kind");
handTypes.set(6, "Five of a Kind");

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
cardTypes.set("J", 11);
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
    let pairCount = 0;
    let threePair = false;
    pairs.forEach((value) => {
	if (value === 2) {
	    pairCount++;
	} else if (value === 3) {
	    threePair = true;
	} else if (value === 4) {
	    handType = 5;
	} else if (value === 5) {
	    handType = 6;
	}
    });

    if (pairCount === 2) {
	handType = 2;
    } else if (threePair) {
	handType = 3;
    }
    if (pairCount === 1) {
	handType += 1;
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
