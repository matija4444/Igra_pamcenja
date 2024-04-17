document.addEventListener("DOMContentLoaded", () => {
    const cards = [...document.querySelectorAll('.memory-card')];
    const resetButton = document.getElementById('reset-button');
    const winMessage = document.getElementById('win-message');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let matchCount = 0; // Inicijalizacija brojača pronađenih parova

    console.log("Ukupan broj kartica:", cards.length); // Logira ukupan broj kartica
    console.log("Broj parova:", cards.length / 2); // Logira broj parova

    cards.forEach(card => card.addEventListener('click', flipCard));
    resetButton.addEventListener('click', resetGame);

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        if (isMatch) {
            disableCards();
            matchCount++;
            console.log("Pronađen par, trenutni broj pronađenih parova:", matchCount); // Logira svaki pronađeni par
            if (matchCount === (cards.length / 2)) {
                console.log("Svi parovi su pronađeni!"); // Logira kada su svi parovi pronađeni
                winMessage.style.display = 'block'; // Prikaz poruke "Čestitam"
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function resetGame() {
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        winMessage.style.display = 'none'; // Sakrivanje poruke prilikom resetiranja
        matchCount = 0; // Resetira brojač parova
        console.log("Igra resetirana. Brojač parova resetiran."); // Logira resetiranje igre
        resetBoard(); // Resetiranje dodatnih kontrola igre ako je potrebno
    }
});
