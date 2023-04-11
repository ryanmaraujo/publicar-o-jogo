var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["bc6341bb-2027-497a-96bf-a7c5cbe69d4e"],"propsByKey":{"bc6341bb-2027-497a-96bf-a7c5cbe69d4e":{"name":"futebol","sourceUrl":"assets/api/v1/animation-library/gamelab/AYKgiaNjv0UtbPRP89eUDfF6ChW0HvBm/category_backgrounds/sports_scoccer.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"AYKgiaNjv0UtbPRP89eUDfF6ChW0HvBm","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/AYKgiaNjv0UtbPRP89eUDfF6ChW0HvBm/category_backgrounds/sports_scoccer.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var chão = createSprite(200, 200, 400, 400);
chão.setAnimation("futebol");
chão.scale = 1;
var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");


//criando quadra
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// criando objetos e lhes dando cores
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";
var compScore = 0;
var playerScore = 0;
text("compScore", 8, 240);
text("playerScore", 8, 180);

function draw() {
  //limpar a tela
  //exibir pontuação
  textSize(30);
  fill("maroon");
  
  if (striker.isTouching(goal1)) {
    compScore = compScore + 1;
    striker.x = 200;
    striker.y = 200;
    striker.velocityX = 0;
    striker.velocityY = 0;
  }
  if(striker.isTouching(goal1))
      { //aumente a pontuação do jogador
        playerScore = playerScore+1 ;
        //use show grid para identificar o valor de x e y para trazer o atacante para o centro
        striker.x=100;
        striker.y=100;
        striker.velocityX=4;
        striker.velocityY=4;
      }

  if (striker.isTouching(goal2)) {
    playerScore = playerScore + 1;
    striker.x = 200;
    striker.y = 200;
    striker.velocityX = 0;
    striker.velocityY = 0;
  }
  // Pontuação
  
      
      if(striker.isTouching(goal2))
      {
        playerScore =  playerScore+1;
        //Redefina o atacante adicionando o valor central de x e y
        striker.x=200;
        striker.y=200;
        striker.velocityX=4;
        striker.velocityY=4;
      }
      
   
      
 
  if ("gameState" == "inicial") {
    text("Aperte espaço para sacar", 30, 250);
    if (keyDown("space")) {
      bola.velocityX = 3;
      bola.velocityY = 3;
      gameState = "jogar";
    }
  }
  if ("gameState" == "jogar") {
    if (bola.isTouching(bottomEdge)) {
      gameState = "fim";
    }
  }
  if ("gameState" == "fim") {
    bola.destroy();
    text("Você perdeu", 150, 250);
  }
 
  
  //faça o bastão do jogador se mover com as teclas de seta
  paddleMovement();
  
  if(compScore == 5)//adicione a condição para verificar se a pontuação do jogador chegou a 5
  
      {
        fill("maroon");
        textSize(40);
        //fim de jogo
        text("Fim de Jogo!",80,160);
      }
  
  //inteligência artificial para o bastão do computador
  //faça com que se mova com a posição y do atacante
  computerMallet.x = striker.x;

  
  //desenhe uma linha no centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //crie bordas de limite
  //faça com que o atacante rebata nas bordas de cima e de baixo
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  //lance o atacante quando a tecla espaço for pressionada
  if (keyDown("space")) {
    serve();
  }
  
 
  drawSprites();
}
var compScore=compScore+1;

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
} 

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
