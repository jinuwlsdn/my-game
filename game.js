const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 공의 속성
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 3,  // x 방향 속도
    dy: 3   // y 방향 속도
};

// 공 그리기
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
}

// 게임 업데이트
function update() {
    // 캔버스 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 공 그리기
    drawBall();
    
    // 공 이동
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // 벽에 부딪히면 튕기기
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    
    requestAnimationFrame(update);
}

// 게임 시작
update();