document.addEventListener('DOMContentLoaded', () => {
    const numbersContainer = document.getElementById('numbers-container');
    const generateButton = document.getElementById('generate-button');

    generateButton.addEventListener('click', () => {
        generateLottoNumbers();
    });

    function generateLottoNumbers() {
        numbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('lotto-ball');
            ball.textContent = number;
            ball.style.backgroundColor = getBallColor(number);
            numbersContainer.appendChild(ball);
        });
    }

    function getBallColor(number) {
        if (number <= 10) return '#F1C40F';
        if (number <= 20) return '#3498DB';
        if (number <= 30) return '#E74C3C';
        if (number <= 40) return '#95A5A6';
        return '#2ECC71';
    }
});