let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let cardDeck = [];
const btnInfo = document.querySelector("#btnInfo");
const popup = document.querySelector(".pop-up");
const playerCards = document.getElementById("playerCards");
const pCard1 = document.getElementById("pCard1");
const pCard2 = document.getElementById("pCard2");
const cCard1 = document.getElementById("cCard1");
const cCard2 = document.getElementById("cCard2");
const pSuit1 = document.getElementById("pSuit1");
const pSuit2 = document.getElementById("pSuit2");
const cSuit1 = document.getElementById("cSuit1");
const cSuit2 = document.getElementById("cSuit2");
const pValue1 = document.getElementById("pValue1");
const pValue2 = document.getElementById("pValue2");
const cValue1 = document.getElementById("cValue1");
const cValue2 = document.getElementById("cValue2");
const deckCount = document.getElementById("deckCount");
const playerPoints = document.getElementById("player-points");
const computerPoints = document.getElementById("computer-points");
const messageText = document.getElementById("message");
let newPlayerCard;
let newComputerCard;
let pPoints = 0;
let cPoints = 0;
let deckCounter = 0;
let check = false;
let firstRound = false;
let nextRound = false;

/// Functions to create & shuffle card deck

function createCardDeck() {
    cardDeck = [];
    for (let i = 0 ; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let count = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                count = 10;
            }
            if (values[i] == "A") {
                count = 11;
            }
            let card = { Value: values[i], Suit: suits[j], Count: count };
            cardDeck.push(card);
        }
    }
};

function shuffleCards() {
    // Cards will be swapped for 1000 rounds
    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * cardDeck.length));
        var location2 = Math.floor((Math.random() * cardDeck.length));
        var tmp = cardDeck[location1];

        cardDeck[location1] = cardDeck[location2];
        cardDeck[location2] = tmp;
    }
};

/// Functions to create player cards

// Function to serve first cards
function createFirstCards() {
    // Player cards
    firstPlayerCard = cardDeck.pop();
    if (firstPlayerCard.Suit === "Hearts" || firstPlayerCard.Suit === "Diamonds") {
        pSuit1.className = "red";
        pValue1.className = "red";
    } else {
        pSuit1.className = "black";
        pValue1.className = "black";        
    }
    pSuit1.innerHTML = firstPlayerCard.Suit;
    pValue1.innerHTML = firstPlayerCard.Value;
    pCard1.classList.add("frontside");

    pCount = firstPlayerCard.Count;
    pPoints = pPoints + pCount;

    secondPlayerCard = cardDeck.pop();
    if (secondPlayerCard.Suit === "Hearts" || secondPlayerCard.Suit === "Diamonds") {
        pSuit2.className = "red";
        pValue2.className = "red";
    } else {
        pSuit2.className = "black";
        pValue2.className = "black";        
    }
    pSuit2.innerHTML = secondPlayerCard.Suit;
    pValue2.innerHTML = secondPlayerCard.Value;
    pCard2.classList.add("frontside");
    
    pCount = secondPlayerCard.Count;
    pPoints = pPoints + pCount;
    playerPoints.innerHTML = pPoints;

    //Computer cards
    firstComputerCard = cardDeck.pop();
    if (firstComputerCard.Suit === "Hearts" || firstComputerCard.Suit === "Diamonds") {
        cSuit1.className = "red";
        cValue1.className = "red";
    } else {
        cSuit1.className = "black";
        cValue1.className = "black";        
    }
    cCount = firstComputerCard.Count;
    cPoints = cPoints + cCount;
    cCard1.classList.add("backside");

    secondComputerCard = cardDeck.pop();
    if (secondComputerCard.Suit === "Hearts" || secondComputerCard.Suit === "Diamonds") {
        cSuit2.className = "red";
        cValue2.className = "red";
    } else {
        cSuit2.className = "black";
        cValue2.className = "black";        
    }
    cSuit2.innerHTML = secondComputerCard.Suit;
    cValue2.innerHTML = secondComputerCard.Value;
    cCard2.classList.add("frontside");

    cCount = secondComputerCard.Count;
    cPoints = cPoints + cCount;

    // Update after first round
    firstRound = true;
    deckCounter = 52-4;
    deckCount.innerHTML = deckCounter;
};

/// Function to create additional cards

// Function to create new player cards
function drawNewPlayerCard() {
    nextPlayerCard = cardDeck.pop();

    parSuit = document.createElement("p");
    parSuit.id = "pSuit";
    parValue = document.createElement("p");
    parValue.id = "pValue";

    newPlayerCard = document.createElement("div");
    newPlayerCard.className = "card";

    if (nextPlayerCard.Suit === "Hearts" || nextPlayerCard.Suit === "Diamonds") {
        parSuit.className = "red";
        parValue.className = "red";
    } else {
        parSuit.className = "black";
        parValue.className = "black";        
    }
    parSuit.innerHTML = nextPlayerCard.Suit;
    parValue.innerHTML = nextPlayerCard.Value;
    newPlayerCard.classList.add("frontside");

    newPlayerCard.appendChild(parSuit);
    newPlayerCard.appendChild(parValue);
    playerCards.appendChild(newPlayerCard);

    pCount = nextPlayerCard.Count;
    if (nextPlayerCard.Value === "A" && (pPoints + pCount) > 21) {
        pCount = 1;
    }
    pPoints = pPoints + pCount;
    playerPoints.innerHTML = pPoints;

    deckCounter = deckCounter - 1;
    deckCount.innerHTML = deckCounter;
};

// Function to show first computer card
function showFirstComputerCard() {
    cCard1.classList.remove("backside");
    cSuit1.innerHTML = firstComputerCard.Suit;
    cValue1.innerHTML = firstComputerCard.Value;
    cCard1.classList.add("frontside");
}

// Function to display additional computer cards
function drawNewComputerCard() {
    let nextComputerCard = cardDeck.pop();

    parSuit = document.createElement("p");
    parSuit.id = "pSuit";
    parValue = document.createElement("p");
    parValue.id = "pValue";

    newComputerCard = document.createElement("div");
    newComputerCard.className = "card";

    if (nextComputerCard.Suit === "Hearts" || nextComputerCard.Suit === "Diamonds") {
        parSuit.className = "red";
        parValue.className = "red";
    } else {
        parSuit.className = "black";
        parValue.className = "black";        
    }
    parSuit.innerHTML = nextComputerCard.Suit;
    parValue.innerHTML = nextComputerCard.Value;
    newComputerCard.classList.add("frontside");

    newComputerCard.appendChild(parSuit);
    newComputerCard.appendChild(parValue);
    computerCards.appendChild(newComputerCard);

    cCount = nextComputerCard.Count;
    if (nextComputerCard.Value === "A" && (cPoints + cCount) > 21) {
        cCount = 1;
    }
    cPoints = cPoints + cCount;
    computerPoints.innerHTML = cPoints;

    deckCounter = deckCounter - 1;
    deckCount.innerHTML = deckCounter;
};

/// Function to check win/loss

function checkGameEnd() {
    if (pPoints == cPoints) {
        messageText.className = "tie";
        messageText.innerText = "It's a tie! Try again!";
        resetGame();
    } else if (pPoints > 21 || (cPoints <=21 && cPoints > pPoints)) {
        messageText.className = "loss";
        messageText.innerText = "You lost. Try again!";
        resetGame();
    } else if 
        (((pPoints == 21 && cPoints < 21) || (pPoints == 21 && cPoints > 21)) || ((pPoints < 21 && pPoints > cPoints) || (pPoints < 21 && cPoints > 21))) {
        messageText.className = "win";
        messageText.innerText = "Congratulations! You won.";
        resetGame();

}};

function resetGame() {
    showButton(btnNew);
    hideButton(btnStand);
    hideButton(btnHit);
};

function startGame() {
    if (firstRound === false) {
        createCardDeck();
        shuffleCards();
        createFirstCards();
    }
};

function newGame() {
    location.reload();
};

/// Functions to handle HTML elements

function showButton(button) {
    button.style.display = "block";
}

function hideButton(button) {
    button.style.display = "none";
}

/// Functionalities of game buttons

hideButton(btnHit);
hideButton(btnStand);

btnStart.addEventListener("click", event => {
    if (firstRound === false) {    
        startGame();
    }
    nextRound = true;
    showButton(btnHit);
    showButton(btnStand);
    hideButton(btnStart);
    hideButton(btnNew);
});

btnHit.addEventListener("click", event => {
    if (nextRound === true && check === false) {
        drawNewPlayerCard();
        if (pPoints > 21) {
            showFirstComputerCard();
            checkGameEnd();
            computerPoints.innerHTML = cPoints;
            check = true;
        }
    }
});

btnStand.addEventListener("click", event => {
    if (nextRound === true && check === false) {
        showFirstComputerCard();
        if (cPoints < 17) {
            drawNewComputerCard();
        }
        checkGameEnd();
        computerPoints.innerHTML = cPoints;
    }
    check = true;
});

btnNew.addEventListener("click", event => {
    newGame();
});

/// Function to show/hide info box

const openPopup = () => {
    popup.style.display = "block";
};
const closePopup = () => {
    popup.style.display = "none";
};
btnInfo.addEventListener("click", event => {
    openPopup();
    setTimeout(closePopup, 3000);
});