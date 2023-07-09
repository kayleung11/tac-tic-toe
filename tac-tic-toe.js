//Global Varibles
const leftTop = document.getElementById('leftTop');
const centerTop = document.getElementById('centerTop');
const rightTop = document.getElementById('rightTop');
const leftMiddle = document.getElementById('leftMiddle');
const centerMiddle = document.getElementById('centerMiddle');
const rightMiddle = document.getElementById('rightMiddle');
const leftBottom = document.getElementById('leftBottom');
const centerBottom = document.getElementById('centerBottom');
const rightBottom = document.getElementById('rightBottom');
const resetBtn = document.getElementById('resetBtn');
const pScore = document.getElementById('pScore');
const cScore = document.getElementById('cScore');
const playerName = document.getElementById('playerName');
const userInput = document.getElementById('userInput');
const nameBtn = document.getElementById('nameBtn');

//const debug = document.getElementById('debug');
//const debug2 = document.getElementById('debug2');

let pScoreJS = 0;
let cScoreJS = 0;

const oWonSign = document.getElementById('Owins');
const xWonSign = document.getElementById('Xwins');
const noWinnerSign = document.getElementById('noWinnerSign');

let tileLeft = 9;

function namePass() {
  let pNameJS = document.getElementById("userInput").value;
  playerName.innerHTML = pNameJS;
  userInput.style.display = 'none';
  nameBtn.style.display = 'none';
}

//An object to store all game status
let status = {
    leftTop: {
        clicked: false,
        face: "?"
    },
    centerTop: {
        clicked: false,
        face: "?"
    },
    rightTop: {
        clicked: false,
        face: "?"
    },
    leftMiddle: {
        clicked: false,
        face: "?"
    },
    centerMiddle: {
        clicked: false,
        face: "?"
    },
    rightMiddle: {
        clicked: false,
        face: "?"
    },
    leftBottom: {
        clicked: false,
        face: "?"
    },
    centerBottom: {
        clicked: false,
        face: "?"
    },
    rightBottom: {
        clicked: false,
        face: "?"
    }
}

//Check all 8 winning condition and returns winner
function checkWinner() { 
    //condition 1 - leftTop to rightTop
    if (status.leftTop.face == "O" && status.centerTop.face == "O" && status.rightTop.face == "O") {
        return "Owins";
    } else if (status.leftTop.face == "X" && status.centerTop.face == "X" && status.rightTop.face == "X") {
        return "Xwins";
    }
    //condition 2 - leftMiddle to rightMiddle
    if (status.leftMiddle.face == "O" && status.centerMiddle.face == "O" && status.rightMiddle.face == "O") {
        return "Owins";
    } else if (status.leftMiddle.face == "X" && status.centerMiddle.face == "X" && status.rightMiddle.face == "X") {
        return "Xwins";
    }
    //condition 3 - leftBottom - rightBottom
    if (status.leftBottom.face == "O" && status.centerBottom.face == "O" && status.rightBottom.face == "O") {
        return "Owins";
    } else if (status.leftBottom.face == "X" && status.centerBottom.face == "X" && status.rightBottom.face == "X") {
        return "Xwins";
    }
    //condition 4 - leftTop - leftBottom
    if (status.leftTop.face == "O" && status.leftMiddle.face == "O" && status.leftBottom.face == "O") {
        return "Owins";
    } else if (status.leftTop.face == "X" && status.leftMiddle.face == "X" && status.leftBottom.face == "X") {
        return "Xwins";
    }
    //condition 5 - centerTop - centerBottom
    if (status.centerTop.face == "O" && status.centerMiddle.face == "O" && status.centerBottom.face == "O") {
        return "Owins";
    } else if (status.centerTop.face == "X" && status.centerMiddle.face == "X" && status.centerBottom.face == "X") {
        return "Xwins";
    }
    //condition 6 - rightTop - rightBottom
    if (status.rightTop.face == "O" && status.rightMiddle.face == "O" && status.rightBottom.face == "O") {
        return "Owins";
    } else if (status.rightTop.face == "X" && status.rightMiddle.face == "X" && status.rightBottom.face == "X") {
        return "Xwins";
    }
    //condition 7 - Diagonal leftTop, centerMiddle, rightBottom
    if (status.leftTop.face == "O" && status.centerMiddle.face == "O" && status.rightBottom.face == "O") {
        return "Owins";
    } else if (status.leftTop.face == "X" && status.centerMiddle.face == "X" && status.rightBottom.face == "X") {
        return "Xwins";
    }
    //condition 8 - Diagonal rightTop, centerMiddle, leftBottom
    if (status.rightTop.face == "O" && status.centerMiddle.face == "O" && status.leftBottom.face == "O") {
        return "Owins";
    } else if (status.rightTop.face == "X" && status.centerMiddle.face == "X" && status.leftBottom.face == "X") {
        return "Xwins";
    }
}

//Turns a tile to "X"
function turnX(element) {
    const elementId = element.target.id;
    element.target.innerHTML = "X";
    status[elementId].clicked = true;
    status[elementId].face = "X";
}

//Turns a tile to "O"
function turnO(element) {
    const elementId = element.target.id;
    element.target.innerHTML = "O";
    status[elementId].clicked = true;
    status[elementId].face = "O";
}

//Evaluate if the tile has been clicked, player and comp moves, then evaluate if winning condition is reached
function btnClick (element) {
    const elementId = element.target.id;
    if (!status[elementId].clicked) {
        turnO(element);
        tileLeft -= 1;
        if (checkWinner() == "Owins") {
            endGame();
            oWonSign.style.display = 'block';
            pScoreJS += 1;
            pScore.innerHTML = pScoreJS;
        } else if (tileLeft == 0) {
            noWinnerSign.style.display = "block";
            endGame();
        } else {
        compMove();
        }
    }
};

function noWinner() {
    let statusArray = [];
    for (let i in status) {
        statusArray.push(status[i].clicked);
    }
    let result = statusArray.includes(false);
    console.log(statusArray);
    return !result;
}

//Make all tiles unclickable, and display reset button
function endGame() {
    status.leftTop.clicked = true;
    status.centerTop.clicked = true;
    status.rightTop.clicked = true;
    status.leftMiddle.clicked = true;
    status.centerMiddle.clicked = true;
    status.rightMiddle.clicked = true;
    status.leftBottom.clicked = true;
    status.centerBottom.clicked = true;
    status.rightBottom.clicked = true;
    resetBtn.style.display = "block";
}

function resetGame() {
    status.leftTop.face = "?";
    status.centerTop.face = "?";
    status.rightTop.face = "?";
    status.leftMiddle.face = "?";
    status.centerMiddle.face = "?";
    status.rightMiddle.face = "?";
    status.leftBottom.face = "?";
    status.centerBottom.face = "?";
    status.rightBottom.face = "?";
    status.leftTop.clicked = false;
    status.centerTop.clicked = false;
    status.rightTop.clicked = false;
    status.leftMiddle.clicked = false;
    status.centerMiddle.clicked = false;
    status.rightMiddle.clicked = false;
    status.leftBottom.clicked = false;
    status.centerBottom.clicked = false;
    status.rightBottom.clicked = false;
    leftTop.innerHTML = "?";
    centerTop.innerHTML = "?";
    rightTop.innerHTML = "?";
    leftMiddle.innerHTML = "?";
    centerMiddle.innerHTML = "?";
    rightMiddle.innerHTML = "?";
    leftBottom.innerHTML = "?";
    centerBottom.innerHTML = "?";
    rightBottom.innerHTML = "?";
    resetBtn.style.display = "none";
    xWonSign.style.display = 'none';
    oWonSign.style.display = 'none';
    noWinnerSign.style.display = "none";
    tileLeft = 9;
}

function generateRandom(tileLength) {
    return Math.floor(Math.random() * tileLength);
} 

function compMove() {
    let openTile = [];
    for (let key in status) {
        if (status[key].face == "?") {
            openTile.push(key);
        }
    }
    let randomTileNum = generateRandom(openTile.length);
    randomTile = openTile[randomTileNum];
    status[randomTile].clicked = true;
    status[randomTile].face = "X";
    document.getElementById(randomTile).innerHTML = "X";
    tileLeft -= 1;
    if (checkWinner() == "Xwins") {
        endGame();
        xWonSign.style.display = 'block';
        cScoreJS += 1;
        cScore.innerHTML = cScoreJS;
    } 
}

//Reset the game when it's clicked
resetBtn.onclick = resetGame;

//Button hit
leftTop.onclick = btnClick; 
centerTop.onclick = btnClick;
rightTop.onclick = btnClick;
leftMiddle.onclick = btnClick;
centerMiddle.onclick = btnClick;
rightMiddle.onclick = btnClick;
leftBottom.onclick = btnClick;
centerBottom.onclick = btnClick;
rightBottom.onclick = btnClick;

debug2.onclick = testing;

function testing() {

    let array1 = [];
    for (let i in status) {
        array1.push(status[i].face);
    }
    console.log(array1);
    console.log(tileLeft);
};