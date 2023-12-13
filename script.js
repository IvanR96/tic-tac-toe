const Player = (name, symbol) => ({
    name,
    symbol,
});

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => [...board];

    const updateCell = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol;
            return true; 
        }
        return false; 
    };

    const checkForWin = () => {
        const board = getBoard();

        // Check rows
        for (let i = 0; i < 9; i += 3) {
            if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
                return board[i]; 
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
                return board[i]; 
            }
        }

        // Check diagonals
        if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
            return board[0];
        }

        if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
            return board[2]; 
        }

        return null; // No winner
    };

    const checkForTie = () => {
        const board = getBoard();

        return !board.includes('') && !checkForWin();
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return {
        getBoard,
        updateCell,
        checkForWin,
        checkForTie,
        resetBoard,
    };
})();

const Game = (() => {
    let currentPlayer = null;
    let player1 = null;
    let player2 = null;
    let isGameOver = false;

    const startGame = () => {
        player1 = Player(document.getElementById('player1').value || 'Player 1', 'X');
        player2 = Player(document.getElementById('player2').value || 'Player 2', 'O');
        currentPlayer = player1;

        isGameOver = false;
        Gameboard.resetBoard();
        renderBoard();
        updateResult('');

        document.getElementById('start-game').style.display = 'none';
    };

    const renderBoard = () => {
        const gameBoardElement = document.getElementById('game-board');
        gameBoardElement.innerHTML = '';

        const board = Gameboard.getBoard();
        for (let i = 0; i < board.length; i++) {
            const cellButton = document.createElement('button');
            cellButton.setAttribute('data-index', i);
            cellButton.addEventListener('click', () => handleCellClick(i));
            cellButton.textContent = board[i];
            gameBoardElement.appendChild(cellButton);
        }
    };

    const handleCellClick = (index) => {
        if (!isGameOver) {
            const symbol = currentPlayer.symbol;

            // Update the game board and check for a winner or tie
            if (Gameboard.updateCell(index, symbol)) {
                renderBoard();
                const winner = Gameboard.checkForWin();
                const tie = Gameboard.checkForTie();

                if (winner) {
                    updateResult(`${currentPlayer.name} wins!`);
                    isGameOver = true;
                } else if (tie) {
                    updateResult('It\'s a tie!');
                    isGameOver = true;
                } else {
                    // Switch to the next player
                    currentPlayer = (currentPlayer === player1) ? player2 : player1;
                }
            }
        }
    };

    const updateResult = (result) => {
        document.getElementById('result').textContent = result;
    };

    return {
        startGame,
    };
})();

document.getElementById('start-game').addEventListener('click', Game.startGame);