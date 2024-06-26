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
const chao = {
 spriteX: 0,
 spriteY: 631,
 largura: 224,
 altura: 112,
 x: 0,
 y: canvas.height - 112,
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
 }

}

const Darkbird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 39,
    x:10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,  
   atualiza () {
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
  
function loop() {
Darkbird.atualiza();
background.desenha();
chao.desenha();
Darkbird.desenha();






requestAnimationFrame (loop);
}
loop();