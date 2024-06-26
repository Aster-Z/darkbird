

const somQueda =  new Audio();
somQueda.src = './efeitos/pipe.wav'


console.log ('[Aster] Dark Bird')
const sprites = new Image ();
sprites.src = './sprites.png';


const canvas = document.querySelector('canvas');
const contexto = canvas.getContext ('2d');


// background
const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height -210,
    desenha(){
contexto.fillStyle = '#121E2C'
contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            background.spriteX, background.spriteY, 
            background.largura, background.altura,  
            background.x, background.y, 
            background.largura, background.altura,
            );
            contexto.drawImage(
                sprites,
                background.spriteX, background.spriteY, 
                background.largura, background.altura,  
                (background.x + background.largura), background.y, 
                background.largura, background.altura,
                );


}
}

//chao
function criaChao () {
 
const chao = {
 spriteX: 0,
 spriteY: 631,
 largura: 224,
 altura: 112,
 x: 0,
 y: canvas.height - 112,
 atualiza(){
    const movimentoDochao = 1;
      const repeteEm = chao.largura / 2;
   if (chao.x <= - repeteEm){
    return chao.x=0
        }
        chao.x = chao.x - 1;
      },
  
 desenha(){
    contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY, 
        chao.largura, chao.altura,  
        chao.x, chao.y, 
        chao.largura, chao.altura,
        );
     
       
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, 
            chao.largura, chao.altura,  
            (chao.x + chao.largura), chao.y, 
            chao.largura, chao.altura,
        );
    },
  };
  return chao;
}

function fazColisao(Darkbird, chao) {
const DarkbirdY = Darkbird.y + Darkbird.altura;
const chaoY = chao.y;

if (Darkbird.y >= chaoY - 30){
    return true;

}
return false;
}


function criaDarkbird(){

const Darkbird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 39,
    x:10,
    y: 50,
    pulo : 4.6,
    pula () {
    Darkbird.velocidade = - Darkbird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,  
   atualiza () {
    if(fazColisao(Darkbird, globais.chao)){
  somQueda.play();
        setTimeout(() => {
        mudaParaTela(Telas.INICIO);
        }, 500);
        return;
    }
    Darkbird.velocidade = Darkbird.velocidade + Darkbird.gravidade;
    Darkbird.y = Darkbird.y + Darkbird.velocidade;
},

desenha() {
contexto.drawImage(
sprites,
Darkbird.spriteX, Darkbird.spriteY, // sprite x e sprite y
Darkbird.largura, Darkbird.altura,  // tamanho do recorte na sprite
Darkbird.x, Darkbird.y, 
Darkbird.largura, Darkbird.altura,
);
   }
  }
return Darkbird;
}
const mensagemGetReady = {
sX: 127,
sY: 18,
w: 197,
h: 152,
x: (canvas.width / 2) - 197/ 2,
y: 50,
desenha () {
    contexto.drawImage(
        sprites,
        mensagemGetReady.sX, mensagemGetReady.sY, 
        mensagemGetReady.w, mensagemGetReady.h,  
        mensagemGetReady.x, mensagemGetReady.y, 
        mensagemGetReady.w, mensagemGetReady.h,
        );
    
   }
}

// telas
///
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){   
telaAtiva =  novaTela;

if(telaAtiva.inicializa) {
telaAtiva.inicializa();

}

}
const Telas = {
    INICIO: {
      inicializa() {
        globais.Darkbird = criaDarkbird();
        globais.chao = criaChao();
      },
      desenha(){
        background.desenha();
        globais.chao.desenha();
        globais.Darkbird.desenha();
        mensagemGetReady.desenha();
      },
      click() {
        mudaParaTela(Telas.JOGO);
      },
      atualiza() {
        globais.chao.atualiza();
      }
    }
  };

Telas.JOGO = {
    inicializa() {
      
    },
    desenha() {
      background.desenha();
      globais.chao.desenha();
      globais.Darkbird.desenha();
    
    },
    click() {
      globais.Darkbird.pula();
    },
    atualiza() {
      
      globais.chao.atualiza();
      globais.Darkbird.atualiza();
    }
  };

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
  
    frames = frames + 1;
requestAnimationFrame (loop);
}
window.addEventListener('click', function(){
if (telaAtiva.click) { 
    telaAtiva.click();
}
});
mudaParaTela(Telas.INICIO);
loop();