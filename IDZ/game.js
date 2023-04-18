// Получаем элемент canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Задаем параметры игры
const gridSize = 10;
const canvasSize = 400;
const snake = [{ x: 20, y: 20 }, { x: 20, y: 30 }];
const apple = { x: 100, y: 100 };
let direction = "right";

// Функция отрисовки змейки
function drawSnake() {
  ctx.fillStyle = "green";
  for (let i = 0; i < snake.length; i++) {
    const cell = snake[i];
    ctx.fillRect(cell.x, cell.y, gridSize, gridSize);
  }
}

// Функция отрисовки яблока
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

// Функция обновления состояния игры
function update() {
  // Обновляем положение головы змейки в зависимости от направления
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }
  // Добавляем новую голову змейке
  snake.unshift(head);

  // Проверяем, съели ли мы яблоко
  if (head.x === apple.x && head.y === apple.y) {
    // Генерируем новое положение яблока
    apple.x = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
    apple.y = Math.floor(Math.random() * canvasSize / gridSize) * gridSize;
  } else {
    // Если не съели яблоко, удаляем хвост змейки
    snake.pop();
  }
}

// Функция проверки на столкновения
function checkCollisions() {
  // Проверяем столкновение с границами игрового поля
  if (snake[0].x < 0 || snake[0].x >= canvasSize || snake[0].y < 0 || snake[0].y >= canvasSize) {
    return true;
  }
  // Проверяем столкновение головы змейки с ее телом
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  // Если столкновений не было, возвращаем false
  return false;
}

// Функция игрового цикла
function gameLoop() {
  // Обновляем состояние игры
  update();

  // Проверяем столкновения
  if (checkCollisions()) {
    alert("Game Over!");
    return;
  }

  // Очищаем экран и отрисовываем игровые объекты
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawApple();

  // Запускаем игровой цикл заново
  setTimeout(gameLoop, 100);
}

// Обрабатываем события клавиатуры
document.addEventListener("keydown", event => {
  switch (event.code) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
      }
      });


      
      // Запускаем игру
      gameLoop();