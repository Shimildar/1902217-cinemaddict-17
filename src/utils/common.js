

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Генерирует уникальную коллекцию
const generateUniqCollection = (collection) => {
  const mySet = new Set(collection);
  const uniqCollection = Array.from(mySet);

  return uniqCollection;
};

// Достает случайный элемент из массива
const getRandomElement = (collection) => {
  const randomIndex = getRandomInteger(0, collection.length - 1);

  return collection[randomIndex];
};

// Нажат эскейп
const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {isEscPressed, getRandomInteger, getRandomElement, generateUniqCollection};
