
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt =  document.querySelector('.app__card-button--longo');

const html =  document.querySelector('html');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startPauseBtText = document.querySelector('#start-pause span')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFinish = new Audio('/sons/beep.mp3')

const startStopIcon = document.querySelector('.app__card-primary-butto-icon');

const tempoNaTela = document.querySelector('#timer')

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')

})

function alterarContexto(contexto){
    zerar()
    mostrarTempo()

    botoes.forEach(function (contexto) {
            contexto.classList.remove('active')
    })


    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
   

    switch (contexto) {
        case "foco":
    titulo.innerHTML = `
     Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
    `
    break;
    case "descanso-curto":
        titulo.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
        ` 
        break;
    
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        
        default:
            break;
    }

}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId != null){
        audioPause.play();
        zerar()
        return
    }
    startStopIcon.setAttribute('src', '/imagens/pause.png')
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBtText.innerHTML = '<strong>Pausar</strong>'
}

function contagemRegressiva () {
    if(tempoDecorridoEmSegundos <= 0 ){
        audioFinish.play();
        console.log('Tempo finalizado!')
        zerar()
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

function zerar(){
    startStopIcon.setAttribute('src', '/imagens/play_arrow.png')
    clearInterval(intervaloId)
    startPauseBtText.innerHTML = '<strong>Começar</strong>'
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormato =  tempo.toLocaleString('pt-br', { minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormato}`
}

mostrarTempo()

