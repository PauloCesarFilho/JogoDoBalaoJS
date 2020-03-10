var timerId = null; //armazena a chamada da funcao timeout (ContaTempo)


//COMECA JOGO COM A DIFICULDADE ESCOLHIDA PELO USUARIO E MOSTRA QUANTIDADES DE BALOES CHEIO E ESTOURADOS
function IniciaJogo() {
    var url = window.location.search;
    var NivelJogo = url.replace("?", "");
    var tempo = 0;

    if (NivelJogo == 3) {//3 dificil 30
        tempo = 30;
    }
    if (NivelJogo == 2) {//2 normal 60
        tempo = 60;
    }
    if (NivelJogo == 1) {//1 facil 120
        tempo = 120;
    }
    //inserir segundos no span
    document.getElementById('cronometro').innerHTML = tempo;

    //     //quantidade de baloes 
    var QTbaloes = 10;

    //Imprimir numero de baloes inteiros
    document.getElementById('balaoCheio').innerHTML = QTbaloes;
    document.getElementById('balaoEstourado').innerHTML = 0;




    //COMECA CRONOMETRO    
    ContaTempo(tempo + 1);
    CriaBalao(QTbaloes);
}
function ContaTempo(segundos) {

    segundos -= 1;
    if (segundos == -1) {
        clearTimeout(timerId); //para no 0 a contagem do cronometro
        gameOver();
        return false;
    }
    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("ContaTempo(" + segundos + ")", 1000);

}

function gameOver() {
    alert('GAME OVER');
    remove_eventos_baloes();
}


//CRIA BALAO NO CENARIO 

function CriaBalao(QTbaloes) {
    for (var i = 1; i <= QTbaloes; i++) {
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '12px';
        balao.id = 'b' + i;
        balao.onclick = function () { Estourar(this); }; // ESTOURA BALAO CHAMANDO A FUNCAO ESTOURAR

        document.getElementById('cenario').appendChild(balao);
    }
}


//COMECA ESTOURA O BALAO COM O CLICK
function Estourar(e) {

    var idBalao = e.id;
    document.getElementById(idBalao).setAttribute("onclick", "");
    document.getElementById(idBalao).src = 'imagens/balao_azul_pequeno_estourado.png';

    placar(-1);

}

//COMECA PLACAR 
function placar(acao) {

    var balaoCheio = document.getElementById('balaoCheio').innerHTML;
    var balaoEstourado = document.getElementById('balaoEstourado').innerHTML;

    balaoCheio = parseInt(balaoCheio);
    balaoEstourado = parseInt(balaoEstourado);

    balaoCheio += acao;
    balaoEstourado -= acao;

    document.getElementById('balaoCheio').innerHTML = balaoCheio;
    document.getElementById('balaoEstourado').innerHTML = balaoEstourado;


    situacao(balaoCheio);
}


function situacao(balaoCheio) {
    if (balaoCheio == 0) {
        //document.getElementById('cronometro').src = 'imagens/balao_azul_pequeno_estourado.png';   
        alert('PARABENS VOCE GANHOU!');
        pararJogo();
    }
}


//COMECA A FUNCAO DO CRONOMETRO PRA NAO FICAR CONSUMINDO MEMORIA 
function pararJogo() {
    clearTimeout(timerId);
}

//FUNCAO QUE NAO DEIXA ESTOURAR BALOES DEPOIS DA DERROTA
function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }

}
