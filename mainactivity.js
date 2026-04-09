let screens = ["screen-logo","screen-intro","screen-menu","screen-lobby","screen-game"];

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let mode = "";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const bgMusic = document.getElementById("bgMusic");

// 🔁 Screen control
function showScreen(id) {
    screens.forEach(s => document.getElementById(s).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// 🎬 FLOW
setTimeout(() => showScreen("screen-intro"), 2000);
setTimeout(() => showScreen("screen-menu"), 5000);

// ▶ Start Game
function startGame(selectedMode) {
    mode = selectedMode;
    showScreen("screen-game");
    restartGame();
    bgMusic.play();
}

// 🎮 Game Logic
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.getAttribute("data-index");

        if (board[index] !== "") return;

        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        // 🏆 Winner
        if (checkWinner()) {
            let winner = currentPlayer;
            statusText.innerText = winner + " Wins 👑";

            launchCelebration();

            setTimeout(() => {
                alert(winner + " Wins 👑");
                restartGame();
            }, 500);

            return;
        }

        // 🤝 Draw
        if (!board.includes("")) {
            statusText.innerText = "It's a Draw!";

            setTimeout(() => {
                alert("Draw!");
                restartGame();
            }, 200);

            return;
        }

        // 🔄 Switch Player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = "Player " + currentPlayer + "'s Turn";

        // 🤖 AI
        if (mode === "robot" && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    });
});

// 🤖 AI
function aiMove() {
    let empty = board.map((v,i)=> v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];
    document.querySelector(`.cell[data-index='${move}']`).click();
}

// 🏆 Winner Check
function checkWinner() {
    let win = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return win.some(p =>
        board[p[0]] &&
        board[p[0]] === board[p[1]] &&
        board[p[1]] === board[p[2]]
    );
}

// 🔄 Restart
function restartGame() {
    board = ["","","","","","","","",""];
    cells.forEach(c => c.innerText = "");
    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
}

// 🔁 Restart Confirm
function confirmRestart() {
    if (confirm("Do you want to restart the game?")) {
        restartGame();
    }
}

// 🚪 Quit Confirm
function confirmQuit() {
    if (confirm("Do you want to quit the game?")) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
        showScreen("screen-menu");
    }
}

// 🎊 Confetti Animation
function launchCelebration() {
    const container = document.getElementById("celebration");

    for (let i = 0; i < 80; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 50%)`;

        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// 🌐 Online Demo
function createRoom() {
    let code = Math.floor(1000 + Math.random()*9000);
    alert("Room Created: " + code);
    showScreen("screen-game");
    restartGame();
}

function joinRoom() {
    let code = document.getElementById("roomCode").value;
    if (code === "") {
        alert("Enter Room Code!");
        return;
    }
    alert("Joined Room: " + code);
    showScreen("screen-game");
    restartGame();
}
