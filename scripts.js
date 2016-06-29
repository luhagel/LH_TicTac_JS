$(document).ready(function () {
    var board = "---------";
    var playerMark = "X";


    setPlayerMark(function (dialog) {
        dialog.style.display = "none";
        renderBoard();
        ticTac();
    });

    /* ##### FUNCTIONS ##### */
    function ticTac() {

        if (playerMark === "O") {
            aiTurn(playerMark, function (newBoard) {
                board = newBoard;
                renderBoard();
            });
        }

        //Handle Clicks
        $("#1").on('click', function () {
            if (board.charAt(0) === "-") {
                nextTurn(1, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#2").on('click', function () {
            if (board.charAt(1) === "-") {
                nextTurn(2, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#3").on('click', function () {
            if (board.charAt(2) === "-") {
                nextTurn(3, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#4").on('click', function () {
            if (board.charAt(3) === "-") {
                nextTurn(4, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#5").on('click', function () {
            if (board.charAt(4) === "-") {
                nextTurn(5, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#6").on('click', function () {
            if (board.charAt(5) === "-") {
                nextTurn(6, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#7").on('click', function () {
            if (board.charAt(6) === "-") {
                nextTurn(7, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#8").on('click', function () {
            if (board.charAt(7) === "-") {
                nextTurn(8, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
        $("#9").on('click', function () {
            if (board.charAt(8) === "-") {
                nextTurn(9, playerMark, function (newBoard) {
                    board = newBoard;
                    renderBoard();
                    if (gameFinished()) {
                        reset();
                    }
                });
            }
        });
    }

    //nextTurn
    function nextTurn(field, playerMark, callBack) {
        board = setCharAt(board, field - 1, playerMark);
        renderBoard();
        if (gameFinished()) {
            reset();
        } else {
            aiTurn(playerMark, function (newBoard) {
                callBack(newBoard);
            });
        }
    }

    //aiTurn
    function aiTurn(playerMark, callBack) {
        //determine ai mark
        var aiMark;
        if (playerMark === "O") {
            aiMark = "X";
        } else {
            aiMark = "O";
        }
        //AI Logic
        getBoardFromAPI(playerMark, aiMark, function (newBoard) {
            if (newBoard) {

                callBack(newBoard);
            } else {
                console.log("no rec from api");
            }
        });
    }

    //apiCall
    function getBoardFromAPI(playerMark, aiMark, callBack) {
        var apiCall = "http://tttapi.herokuapp.com/api/v1/" + board + "/" + aiMark;
        var newBoard = "";
        $.getJSON(apiCall, function (response) {
            newBoard = setCharAt(board, response.recommendation, aiMark);
            callBack(newBoard);
        });
    }

    //hasWon
    function gameFinished() {
        var patterns = [
            "111000000",
            "000111000",
            "000000111",
            "100100100",
            "010010010",
            "001001001",
            "100010001",
            "001010100"
        ];
        for (var i = 0; i < patterns.length; i++) {
            if (checkPattern(patterns[i], "X")) {
                alert("X" + " has won"); //XXXXXXXXXXXXXXXX
                return true;
            }
            if (checkPattern(patterns[i], "O")) {
                alert("O" + " has won"); //OOOOOOOOOOOOOOOOO
                return true;
            }
        }
        if (checkDraw()) {
            alert("Draw!"); //Draw
            return true;
        }
        return false;
    }

    //renderBoard
    function renderBoard() {
        console.log(board);
        for (var i = 0; i < 9; i++) {
            if (board.charAt(i) === "-") {
                $("#" + (i + 1)).text("");
            } else {
                $("#" + (i + 1)).text(board.charAt(i));
            }
        }
    }

    //checkPattern
    function checkPattern(pattern, mark) {
        for (var i = 0; i < 9; i++) {
            if (pattern[i] === "1") {
                if (board.charAt(i) !== mark) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkDraw() {
        var boardArr = board.split("");
        for (var i = 0; i < boardArr.length; i++) {
            if (boardArr[i] === "-") {
                return false;
            }
        }
        return true;
    }

    //setCharAt
    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.toString().substr(0, index) + chr + str.toString().substr(index + 1);
    }

    function reset() {
        board = "---------";
        renderBoard();
        setPlayerMark(function (dialog) {
            dialog.style.display = "none";
        });
    }

    //setPlayerMark
    function setPlayerMark(callback) {
        var dialog = document.getElementById("markDialog");
        dialog.style.display = "inline";
        $("#setPlayerMarkX").on('click', function () {
            playerMark = "X";
            callback(dialog);
        });
        $("#setPlayerMarkO").on('click', function () {
            playerMark = "O";
            callback(dialog);
        });
    }
});