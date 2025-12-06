const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 공의 속성
let ball = {
    x: canvas.width / 2, // 좌표값
    y: canvas.height / 2,
    radius: 20,
    dx: 2,  // x 방향 속도
    dy: 2,   // y 방향 속도
    speed: 4
};

let enemy = {
    x : 50,
    y: 50,
    radius: 15,
    speed: 2
};

let keys = {
    w: false,
    a : false,
    s : false,
    d : false
};

function keyDownHandler(e) {
    if(e.code === 'KeyW'){
        keys.w = true;
    }
    else if(e.code === 'KeyA'){
        keys.a = true;
    }
    else if(e.code === 'KeyS'){
        keys.s = true;
    }
    else if(e.code === 'KeyD'){
        keys.d = true;
    }
}

function keyUpHandler(e) {
    if(e.code === 'KeyW'){
        keys.w = false;
    }
    else if(e.code === 'KeyA'){
        keys.a = false;
    }
    else if(e.code === 'KeyS'){
        keys.s = false;
    }
    else if(e.code === 'KeyD'){
        keys.d = false;
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false); // <- 각 인자가
// 의미하는게 무엇인가? 그리고 keydown keyup 이 진짜 있는 값인가
//document는 어디서나온거임 addEventListener의 인자값이 무엇인가

function mouseDownHandler(e) {
    //각 코드가 뜻하는것이 무엇이고 어떤 함수를 호출했는지 
    // const는 왜쓰는지?
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top; // rect? top?
    

    let newSlice = {
        x: mouseX,
        y: mouseY,
        width: 150,
        height: 10,
        angle: 45 * Math.PI / 180, // 회전각도 45도 라디안으로 변환
        opacity :1.0,
        life: 30    

    };
    
    slices.push(newSlice);
}


let slices=[];

document.addEventListener('mousedown', mouseDownHandler, false);

// 베기 효과를 그리는 함수
function drawSlices() {
    slices.forEach(slice => {
        // 투명도 설정
        ctx.globalAlpha = slice.opacity;

        // 회전을 위해 캔버스 좌표계 저장
        ctx.save();

        // 클릭 위치로 좌표계 이동
        ctx.translate(slice.x, slice.y);

        // 베기 효과 회전
        ctx.rotate(slice.angle);

        // 사각형 그리기 (중앙 정렬을 위해 x, y를 폭/높이의 절반만큼 이동)
        ctx.fillStyle = '#ffffff'; // 베기 색상 (흰색)
        ctx.fillRect(-slice.width / 2, -slice.height / 2, slice.width, slice.height);

        // 좌표계 복원
        ctx.restore();

        // 투명도 기본값으로 복원
        ctx.globalAlpha = 1.0;
    });
}

// 공 그리기
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#d8700eff';
    ctx.fill();
    ctx.closePath();
}


// 게임 업데이트
function update() {
    // 캔버스 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. 베기 효과 업데이트 및 수명 관리
    slices = slices.filter(slice => {
        slice.life--;
        // 수명에 따라 투명도 감소 (서서히 사라짐)
        slice.opacity = slice.life / 30; // 30 프레임 동안 사라지도록 설정

        // life가 0보다 크면 배열에 남기고, 아니면 제거
        return slice.life > 0;
    });

    // 3. 베기 효과 그리기 (공보다 먼저 그려야 공이 위에 덮어쓰지 않습니다.)
    drawSlices();
   

    ball.dx = 0;
    ball.dy = 0;

    //true겠죠
    if(keys.w){
        ball.dy = -ball.speed;
    }
    if(keys.s){
        ball.dy = ball.speed;
    }
    if(keys.a){
        ball.dx = -ball.speed;
    }
    if(keys.d){
        ball.dx = ball.speed;
    }
    

    ball.x += ball.dx;
    ball.y += ball.dy;


    //벽 튕김 대신 경계제한 로직.
    if(ball.x + ball.radius > canvas.width){
        ball.x = canvas.width - ball.radius;
    }
    if(ball.x - ball.radius < 0){
        ball.x = ball.radius;
    }

    if(ball.y + ball.radius > canvas.height){
        ball.y = canvas.height - ball.radius;
    }
    if(ball.y - ball.radius < 0){
        ball.y = ball.radius;
    }

    drawBall();

    requestAnimationFrame(update); //<- 앤 뭐임?
}

// 게임 시작
update();