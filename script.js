let largura = 0;
let altura = 0;
let vidas = 1;
let tempo = 31;

let levelTempo = 1500;

let dificuldade = window.location.search;
dificuldade = dificuldade.replace('?', '');

if (dificuldade === 'normal') {
  levelTempo = 1500;
} else if (dificuldade === 'dificil') {
  levelTempo = 1000;
} else if (dificuldade === 'onFire') {
  levelTempo = 750;
}


function ajustarWindow(largura, altura) {
  largura = window.innerWidth;
  altura = window.innerHeight;
  return [largura, altura];
}
ajustarWindow();
largura = ajustarWindow()[0] - 90;
altura = ajustarWindow()[1] - 180;

let cronometro = setInterval(function () {
  tempo -= 1;
  if (tempo < 0) {
    clearInterval(cronometro);
    clearInterval(criaMosquito);
    window.location.href = './vitoria.html';
  } else {
    document.querySelector('#cronometro').innerHTML = tempo;
  }
}, 1000);

function posicaoRandom() {
  if (document.querySelector('#mosquito')) {
    document.querySelector('#mosquito').remove();

    if (vidas > 3) {
      window.location.href = './gameOver.html';
    } else {
      document.querySelector('#v' + vidas).src = './imagens/coracao_vazio.png';
      vidas++;

      console.log(document.querySelector(`#v${vidas}`));
    }
  }

  let posicaoX = Math.floor(Math.random() * largura);
  let posicaoY = Math.floor(Math.random() * altura);

  //HTML
  let mosquito = document.createElement('img');
  mosquito.src = './imagens/mosca.png';
  mosquito.className = `${tamanhoAleatorio()} ${ladoAleatorio()}`;
  mosquito.style.position = 'absolute';
  mosquito.style.left = `${posicaoX}px`;
  mosquito.style.top = `${posicaoY}px`;
  mosquito.id = 'mosquito';
  mosquito.onclick = function () {
    this.remove();
  };

  document.body.appendChild(mosquito);
}

let criaMosquito = setInterval(function () {
  posicaoRandom();
}, levelTempo);

function tamanhoAleatorio() {
  let classe = Math.floor(Math.random() * 3);

  switch (classe) {
    case 0:
      return 'mosquito1';

    case 1:
      return 'mosquito2';

    case 2:
      return 'mosquito3';
  }
}

function ladoAleatorio() {
  let lado = Math.floor(Math.random() * 2);

  switch (lado) {
    case 0:
      return 'ladoA';

    case 1:
      return 'ladoB';
  }
}
