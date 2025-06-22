let apples = [];
let truckApples = 0;
let showButton = false;
let showMessage = false;
let button;

let gameStarted = false; // controla se o jogo já começou

function setup() {
  createCanvas(600, 400);

  // Criar 7 maçãs espalhadas pela árvore
  for (let i = 0; i < 7; i++) {
    let angle = random(TWO_PI);
    let rx = random(30, 50);
    let ry = random(30, 50);
    let x = 450 + cos(angle) * rx;
    let y = 200 + sin(angle) * ry;
    apples.push({ x, y, collected: false });
  }
}

function draw() {
  background(135, 206, 235); // Céu azul

  if (!gameStarted) {
    showStartScreen();
    return;
  }

  if (showMessage) {
    showFinalMessage();
    return;
  }

  // Contador de maçãs
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(`Maçãs no caminhão: ${truckApples}`, width / 2, 30);

  // Grama
  noStroke();
  fill(50, 205, 50);
  rect(0, 300, width, 100);

  // Casa
  fill(210, 180, 140);
  rect(100, 200, 150, 100);
  fill(139, 69, 19);
  triangle(100, 200, 175, 140, 250, 200);
  fill(0);
  rect(160, 250, 30, 50);
  fill(173, 216, 230);
  rect(120, 220, 30, 30);

  // Árvore
  fill(139, 69, 19);
  rect(440, 220, 20, 80);
  fill(34, 139, 34);
  ellipse(450, 200, 80, 80);
  ellipse(420, 210, 70, 70);
  ellipse(480, 210, 70, 70);

  // Maçãs na árvore
  for (let apple of apples) {
    if (!apple.collected) {
      fill(255, 0, 0);
      ellipse(apple.x, apple.y, 12, 12);
    }
  }

  // Caminhão
  drawTruck(300, 270);

  // Maçãs no caminhão
  for (let i = 0; i < truckApples; i++) {
    fill(255, 0, 0);
    ellipse(310 + i * 10, 275, 8, 8);
  }

  // Mostrar botão se todas as maçãs forem coletadas
  if (truckApples === 7 && !showButton) {
    showButton = true;
    button = createButton('Enviar para a cidade');
    button.position(width / 2 - 70, 50);
    button.mousePressed(() => {
      showMessage = true;
      button.hide();
    });
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    return;
  }

  if (showMessage) return;

  for (let apple of apples) {
    if (!apple.collected) {
      let d = dist(mouseX, mouseY, apple.x, apple.y);
      if (d < 10) {
        apple.collected = true;
        truckApples++;
        break;
      }
    }
  }
}

function drawTruck(x, y) {
  fill(200, 0, 0);
  rect(x, y, 80, 30, 5);
  fill(255, 50, 50);
  rect(x + 80, y + 10, 40, 20, 3);
  fill(173, 216, 230);
  rect(x + 85, y + 12, 20, 15);
  fill(100);
  rect(x + 115, y - 10, 5, 10);
  fill(255, 255, 100);
  ellipse(x + 122, y + 20, 5, 5);
  fill(30);
  ellipse(x + 15, y + 30, 18, 18);
  ellipse(x + 95, y + 30, 18, 18);
}

function showFinalMessage() {
  background(255);
  fill(34, 139, 34);
  textAlign(CENTER, CENTER);
  textSize(26);
  text("🎉 Parabéns! Conexão campo e cidade feita,\nmercado abastecido. 🚚🏙️", width / 2, height / 2);
}

function showStartScreen() {
  background(135, 206, 235);
  fill(0);
  textAlign(CENTER);
  textSize(28);
  text("Como jogar:", width / 2, 100);

  textSize(18);
  text("Clique nas maçãs vermelhas para coletá-las.", width / 2, 150);
  text("Cada maçã vai para o caminhão.", width / 2, 180);
  text("Quando todas forem coletadas, envie para a cidade.", width / 2, 210);

  textSize(22);
  fill(0, 102, 204);
  text("Clique para iniciar", width / 2, height - 50);
}
