const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 365, y: 540, width: 70, height: 20, speed: 8, score: 0 };
let currentCoin = null; 
let keys = {};
let gameOver = false;

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

function spawnCoin() {
    if (gameOver) return;
    currentCoin = {
        x: Math.random() * (canvas.width - 20) + 10,
        y: -20,
        size: 10,
        speed: 4 + Math.random() * 3 
    };
}

spawnCoin();

function update() {
    if (gameOver) return;

    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += player.speed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e94560";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    if (currentCoin) {
        currentCoin.y += currentCoin.speed;

        ctx.fillStyle = "#f5b041";
        ctx.beginPath();
        ctx.arc(currentCoin.x, currentCoin.y, currentCoin.size, 0, Math.PI * 2);
        ctx.fill();

        if (currentCoin.y + currentCoin.size >= player.y && currentCoin.x >= player.x && currentCoin.x <= player.x + player.width) {
            player.score += 1;
            spawnCoin(); 
        }

        else if (currentCoin.y > canvas.height) {
            gameOver = true;
            sendScoreToServer(player.score);
        }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("Монеты: " + player.score, 20, 40);

    requestAnimationFrame(update);
}

function sendScoreToServer(score) {
    const nickname = prompt("Игра окончена! Введите ваш ник для таблицы рекордов:");
    
    fetch("java1.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "name=" + encodeURIComponent(nickname) + "&score=" + score
    })
    .then(response => response.text())
    .then(data => {
        alert("Результат отправлен! " + data);
        location.reload();
    });
}

update();