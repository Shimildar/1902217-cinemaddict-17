import dayjs from 'dayjs';

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

// Приводит в нужный формат дату и время
const humanizeDate = (date, format) => dayjs(date).format(format);

// Приводит в нужный формат длительность фильма из минут в часы и минуты
const humanizeFilmRuntime = (item) => {
  const hours = Math.floor(item / 60);
  const minutes = item - (60 * hours);

  return `${hours}h ${minutes}m`;
};

// Отсортировывает комментарии
const sortComments = (film, comments) => {
  const filmComments = film.comments;
  const sortedComments = [];

  for (const comment of comments) {
    filmComments.forEach((item) => {
      if (comment.id === item) {
        sortedComments.push(comment);
      }
    });
  }

  return sortedComments;
};

// Обрезает длину строки
const cutTextLength = (text, maxLength) => (text.length > 140) ? text.slice(0, maxLength).concat('...') : text;

export {getRandomInteger, getRandomElement, humanizeDate, humanizeFilmRuntime, generateUniqCollection, sortComments, cutTextLength};


