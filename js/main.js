console.log('main loaded');

const main = document.querySelector('main');
const endScreen = document.querySelector('.end-screen');
const playWonDisplay = document.querySelector('.player-won');
const resetBtn = document.querySelector('.reset-btn');
const tiles = [];
const winConditions = [7, 56, 448, 73, 146, 292, 273, 84];

let playerTurn = 'x';
let xPoints = 0;
let oPoints = 0;


createField();

resetBtn.addEventListener('click', reset);

function createField() {
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        main.appendChild(tile);

        const tileObject = {
            value: Math.pow(2, i),
            htmlElement: tile,
            occupied: false,
        };
        tiles.push(tileObject);
    }
    createEventListeners();
}

function createEventListeners() {
    tiles.forEach(tile => {
        tile.htmlElement.addEventListener('click', () => {
            placeMark(tile);
        });
    });
}

function placeMark(tile) {
    if (!tile.occupied) {
        if (playerTurn === 'x') {
            xPoints += tile.value;
            tile.htmlElement.textContent = 'X'
            playerTurn = 'o';
        } else {
            oPoints += tile.value;
            tile.htmlElement.textContent = 'O';
            playerTurn = 'x';
        }
        tile.htmlElement.classList.add('occupied');
        tile.occupied = true;
    }
    checkWinCondition();
}

function checkWinCondition() {
    let winPlayer = '';
    for (const condition of winConditions) {
        if ((xPoints & condition) === condition) {
            winPlayer = 'X won';
            break;
        } else if ((oPoints & condition) === condition) {
            winPlayer = 'O won';
            break;

        }
    }
    if (winPlayer !== '') {
        gameWon(winPlayer);
    } else {
        let openSpace = false;
        for(const tile of tiles){
            if (!tile.occupied){
                openSpace = true;
                break;
            }
        }
        if (!openSpace){
            gameWon('Draw');
        }
    }
}

function gameWon(condition) {
    playWonDisplay.textContent = condition;
    endScreen.classList.remove('hidden');
}

function reset(){
    for (const tile of tiles){
        tile.htmlElement.textContent = '';
        tile.htmlElement.classList.remove('occupied');
        tile.occupied = false;
    }
    xPoints = 0;
    oPoints = 0;
    endScreen.classList.add('hidden');
}