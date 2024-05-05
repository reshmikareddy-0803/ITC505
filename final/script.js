document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const squares = [];

    function createBoard() {
        for (let i = 0; i < 25; i++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('click', () => toggleSquare(square));
            board.appendChild(square);
            squares.push(square);
        }
    }

    function toggleSquare(square) {
        square.classList.toggle('active');
        const index = squares.indexOf(square);
        const row = Math.floor(index / 5);
        const col = index % 5;

        toggleAdjacentSquares(row - 1, col); // Top
        toggleAdjacentSquares(row + 1, col); // Bottom
        toggleAdjacentSquares(row, col - 1); // Left
        toggleAdjacentSquares(row, col + 1); // Right

        checkWin();
    }

    function toggleAdjacentSquares(row, col) {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            const index = row * 5 + col;
            squares[index].classList.toggle('active');
        }
    }

    function checkWin() {
        if (squares.every(square => !square.classList.contains('active'))) {
            setTimeout(() => {
                alert('You win!');
                restartGame();
            }, 200);
        }
    }

    function restartGame() {
        squares.forEach(square => square.classList.remove('active'));
        shuffleBoard();
    }

    function shuffleBoard() {
        squares.forEach(square => {
            if (Math.random() < 0.5) {
                square.classList.toggle('active');
                const index = squares.indexOf(square);
                const row = Math.floor(index / 5);
                const col = index % 5;

                toggleAdjacentSquares(row - 1, col); // Top
                toggleAdjacentSquares(row + 1, col); // Bottom
                toggleAdjacentSquares(row, col - 1); // Left
                toggleAdjacentSquares(row, col + 1); // Right
            }
        });
    }

    createBoard();
    shuffleBoard();

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);
});
