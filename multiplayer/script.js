const socket = io("https://tic-tac-toe-backend-zbnn.onrender.com/"); // Replace with actual backend URL
const roomId = new URLSearchParams(window.location.search).get("room");
socket.emit("join-room", roomId);

let buttons = document.querySelectorAll(".btn");
let XO = "X";
let arr = [];
let arr2 = [];
let index = 0;
let indexo = 0;
let winbox = document.querySelector(".main")
let nameX = localStorage.getItem("nameX") || "X"
let nameO = localStorage.getItem("nameO") || "O"
document.querySelector(".title").innerHTML = `${nameX}'s Turn`

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        let btnid = button.id;
        let moveIndex = Number(btnid[4]) - 1;

        // Emit move to server
        socket.emit("player-move", {
            roomId,
            index: moveIndex,
            XO
        });
    });
});

// Handle incoming move from server
socket.on("update-move", ({ index: moveIndex, XO: moveSymbol }) => {
    let btnId = `btn${moveIndex + 1}`;
    let box = document.querySelector(`.${btnId}b`);
    let btn = document.getElementById(btnId);

    box.innerHTML = moveSymbol;
    btn.disabled = true;

    if (moveSymbol === "X") {
        arr[index++] = moveIndex;
        XO = "O";
        document.querySelector(".title").innerHTML = `${nameO}'s Turn`;
    } else {
        arr2[indexo++] = moveIndex;
        XO = "X";
        document.querySelector(".title").innerHTML = `${nameX}'s Turn`;
    }

    checkWinCondition();
});

function checkWinCondition() {
    let winingConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6],
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];

    let isWinner = (moves) => {
        return winingConditions.some((condition) => {
            return condition.every((index) => moves.includes(index));
        });
    };

    if (isWinner(arr)) {
        winbox.id = "win"
        winbox.innerHTML = `<h1>Congratulations ${nameX} Wins</h1>
        <h1>Thanks for Playing</h1>
        <button onclick="reset()" class="reset">reset</button>`
    } else if (isWinner(arr2)) {
        winbox.id = "win"
        winbox.innerHTML = `<h1>Congratulations ${nameO} Wins</h1>
        <h1>Thanks for Playing</h1>
        <button onclick="reset()" class="reset">reset</button>`
    } else if (index + indexo === 8) {
        winbox.id = "win"
        winbox.innerHTML = `<h1>Tie</h1>
        <h1>Thanks for Playing</h1>
        <button onclick="reset()" class="reset">reset</button>`
    }
}

let reset = () => window.location.reload();
