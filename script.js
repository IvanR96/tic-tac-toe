const player = (function(){
    (name,symbol) => ({name, symbol});

});


const gameBoard = ({
    const board = ['','','','','','','','',''];

    const getBoard = () => [...board];

    const updateCell = (index, symbol) =>{
        if (board[index]=== ''){
            board[index] = symbol;
            return true;
        }
        return false;

    };


    const checkWin = () => {

    };


    const checkTie = () => {

    };

    const resetBoard = () =>{
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
    };
    
    return {getBoard,
    updateCell, checkWin,
    checkTie,resetBoard
    };
})();