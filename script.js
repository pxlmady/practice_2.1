const cardContainer = document.getElementsByClassName('card__container')[0];

// Получаем оригинальные карточки (первые 4)
const originalCards = Array.from(document.querySelectorAll('.card')).slice(0, 4);

// Массив с уникальными изображениями для каждой карточки
const imageSources = [
    './img/my_charmander.jpg',
    './img/my_squirtle.jpg',
    './img/my_pikachu.jpg',
    './img/my_bulbasaur.jpg'
];

// Функция для случайного перемешивания массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Меняем местами элементы
    }
}

// Функция для клонирования карточек с уникальными изображениями
function cloneCardWithImage(cardTemplate, imageSrc) {
    const clone = cardTemplate.cloneNode(true);  // Клонируем карточку
    const imageElement = clone.querySelector('img');
    imageElement.src = imageSrc;  // Задаём уникальное изображение
    return clone;
}

// Массив для всех карточек, которые будут добавлены в контейнер
let allCards = [];

// Количество карточек, которые нужно добавить
const totalCards = 100;

// Клонируем карточки и меняем их изображения
for (let i = 0; i < totalCards; i++) {
    // Клонируем случайную карточку из оригинальных
    const cardToClone = originalCards[i % originalCards.length];

    // Выбираем случайное изображение для текущей карточки
    const imageSrc = imageSources[i % imageSources.length];

    // Клонируем карточку с новым изображением
    const newCard = cloneCardWithImage(cardToClone, imageSrc);

    // Сохраняем оригинальный класс карточки (first, second и т.д.)
    const originalClass = cardToClone.classList[1]; // Получаем второй класс
    newCard.classList.add(originalClass); // Добавляем его в клонированную карточку

    // Добавляем карточку в массив
    allCards.push(newCard);
}

// Перемешиваем все карточки, чтобы они были в случайном порядке
shuffle(allCards);

// Добавляем все перемешанные карточки в контейнер
allCards.forEach(card => {
    cardContainer.appendChild(card);
});

// Инициализация VanillaTilt
VanillaTilt.init(document.querySelectorAll('.card'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
    scale: 1.2,
});

// Анимация карток при наведении
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.add('inactive');
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        cards.forEach(otherCard => {
            otherCard.classList.remove('inactive');
        });
    });
});
