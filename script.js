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
    button.addEventListener("click", abc);
    function abc() {
        let btnid = button.id;
        let box = document.querySelector(`.${btnid}b`);
        box.innerHTML = XO;
        button.disabled = true;

        if (XO == "X") {
            document.querySelector(".title").innerHTML = `${nameO}'s Turn`
            arr[index++] = Number(btnid[4]) - 1;
            XO = "O";
        } else {
            document.querySelector(".title").innerHTML = `${nameX}'s Turn`
            arr2[indexo++] = Number(btnid[4]) - 1;
            XO = "X";
        }
        checkWinCondition();
    }
});

function checkWinCondition() {
    let winingConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 4, 8], [2, 4, 6], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ];
    
    let isWinner = (moves) => {
        return winingConditions.some((condition) => {
            return condition.every((index) => {
                return moves.includes(index);
            });
        });
    };

    if (isWinner(arr)) {
        winbox.id = "win"
        winbox.innerHTML = `<h1>Congratulations ${nameX} Wins</h1>
        <h1>Thanks for Playing</h1>
        <button onclick="reset()" class="reset">reset</button>`
    } else if (isWinner(arr2)) {
        winbox.id = "win"
        let nameO = localStorage.getItem("nameO")
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
let reset = () => {
    window.location.reload()
    
}
