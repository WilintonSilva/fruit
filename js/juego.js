// Lista de imágenes locales para las cartas
const images = [
    './imagenes/cereza.png',
    './imagenes/mango.png',
    './imagenes/manzana.png',
    './imagenes/pera.png',
    './imagenes/banana.png',
    './imagenes/sandia.png',
    './imagenes/limon.png',
    './imagenes/kiwi.png'
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let seconds = 0;
let gameStarted = false;

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    gameBoard.innerHTML = '';
    
    // Crear pares de imágenes
    const cardPairs = [...images, ...images];
    // Mezclar las cartas
    cards = cardPairs.sort(() => Math.random() - 0.5);
    
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        
        // Crear la cara frontal (verde)
        const frontFace = document.createElement('div');
        frontFace.className = 'card-face card-front';
        
        // Crear la cara trasera (imagen)
        const backFace = document.createElement('div');
        backFace.className = 'card-face card-back';
        backFace.style.backgroundImage = `url('${image}')`; // Usar ruta local
        
        card.appendChild(frontFace);
        card.appendChild(backFace);
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (!gameStarted || card.classList.contains('flipped') || flippedCards.length >= 2) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = cards[card1.dataset.index] === cards[card2.dataset.index];
    
    if (match) {
        matchedPairs++;
        document.getElementById('pairs').textContent = matchedPairs;
        document.getElementById('remaining').textContent = 8 - matchedPairs;
        
        if (matchedPairs === 8) {
            endGame();
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    flippedCards = [];
}

function updateTimer() {
    seconds++;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    document.getElementById('timer').textContent = 
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function endGame() {
    clearInterval(timer);
    gameStarted = false;

    // Mostrar el popup
    const popup = document.getElementById('popup');
    const finalTime = document.getElementById('timer').textContent;
    document.getElementById('final-time').textContent = finalTime;
    popup.style.display = 'flex';
}

// Función para cerrar el popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    // Reinicia el juego si lo deseas
    initGame();
}

function initGame() {
    matchedPairs = 0;
    seconds = 0;
    gameStarted = true;
    document.getElementById('pairs').textContent = '0';
    document.getElementById('remaining').textContent = '8';
    document.getElementById('timer').textContent = '00:00:00';
    
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    
    createBoard();
}

// Configuración inicial
createBoard();
