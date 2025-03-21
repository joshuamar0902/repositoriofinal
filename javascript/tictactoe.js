const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const display = document.getElementById('winner');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

function hayGanador(){
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
        [0, 4, 8], [2, 4, 6] // diagonales
    ];
    for(const combinacion of combinacionesGanadoras){
        const [a, b, c] = combinacion;
        if(boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]){
            return boardState[a];
        }
    }
    return null;
}

function cellClick(event){
    const cell = event.target;
    const index = cell.dataset.index;

    if(!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    const winner = hayGanador();
    if(winner){
        display.textContent = `El ganador es ${winner}`;
        gameActive = false;
    }
    else if(!boardState.includes('')){
        display.textContent = `X y 0 han empatado`;
        gameActive = false;
    }
    else{
        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
    }
}

cells.forEach(
    cell => cell.addEventListener('click', cellClick)
);