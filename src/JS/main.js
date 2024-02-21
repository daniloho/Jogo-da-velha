const elementoCelula = document.querySelectorAll('[data-cel]')
const quadro = document.querySelector('[data-quadro]')
const mensagem = document.querySelector('[data-mensagem]')
const mensagemVencedor = document.querySelector('[data-mensagem-vencedor]')
const botao = document.querySelector("[data-botao]")

let isBombaTurn;

const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    isBombaTurn = false;

    for (const cel of elementoCelula) {
        cel.classList.remove('bomba');
        cel.classList.remove('barbie');
        cel.removeEventListener('click', handClick)
        cel.addEventListener('click', handClick, { once: true });

        setBoardHoverClass();
        mensagemVencedor.classList.remove('show-winning-message')
    }

};

const endGame = (isDraw) => {
    if (isDraw) {
        mensagem.innerText = 'Empate!'
    }
    else {
        mensagem.innerText = isBombaTurn ? "Oppenheimer Venceu!" : "Barbie Venceu!"
    }

    mensagemVencedor.classList.add("show-winning-message")
};


const verificaVitoria = (curresntPlayer) => {
    return combinacoesVitoria.some(combination => {
        return combination.every(index => {
            return elementoCelula[index].classList.contains(curresntPlayer)
        });
    });
};

const verificaEmpate = () => {
    return [...elementoCelula].every(cel => {
        return cel.classList.contains('barbie') || cel.classList.contains('bomba')
    })
}

const placeMark = (cel, classToAdd) => {
    cel.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    quadro.classList.remove('barbie');
    quadro.classList.remove('bomba');

    if (isBombaTurn) {
        quadro.classList.add('bomba')
    }
    else {
        quadro.classList.add('barbie')
    }
}

const swapTurns = () => {
    isBombaTurn = !isBombaTurn
    setBoardHoverClass();
}

const handClick = (e) => {
    const cel = e.target;
    const classToAdd = isBombaTurn ? 'bomba' : 'barbie';

    placeMark(cel, classToAdd)

    const isWin = verificaVitoria(classToAdd);
    const isDraw = verificaEmpate();

    if (isWin) {
        endGame(false)
    }
    else if (isDraw) {
        endGame(true)
    }
    else {
        swapTurns();
    }
}

startGame();

botao.addEventListener('click', startGame)