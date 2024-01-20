const DESCRIPTIONS = [
  'Девушка пьёт кофе.',
  'Друзья играют в волейбол.',
  'Рыжий кот сидит на подоконнике.',
  'Мальчик вышивает крестиком.',
  'Влюблённая пара смотрит на салют.',
  'Девушка делает заказ в кафе.',
  'Дети играют в вышибалы.',
  'За окном идёт дождь.',
  'Семейное фото.'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Пётр',
  'Сергей',
  'Кирилл',
  'Данил',
  'Любовь',
  'Матвей',
  'Анна'
];

const PHOTOS_AMOUNT = 25;
const CommentAmountRange = {
  MIN: 1,
  MAX: 5,
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedId = 1;

  return function() {
    return lastGeneratedId++;
  };
}

function createRandomUniqueIdGenerator(min, max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const CommentIdRange = {
  MIN: 1,
  MAX: 1000,
};
const generatedCommentId = createRandomUniqueIdGenerator(CommentIdRange.MIN, CommentIdRange.MAX);
const AvatarNumberRange = {
  MIN: 1,
  MAX: 6,
};

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getRandomInteger(AvatarNumberRange.MIN, AvatarNumberRange.MAX)}.svg`,
  message: `${getRandomArrayElement(COMMENTS)}`,
  name: `${getRandomArrayElement(NAMES)}`
});

const generatedPhotoId = createIdGenerator();
const LikeAmountRange = {
  MIN: 15,
  MAX: 200,
};

const createPhoto = () => {
  const id = generatedPhotoId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTIONS)}`,
    likes: `${getRandomInteger(LikeAmountRange.MIN, LikeAmountRange.MAX)}`,
    comments: Array.from({length: getRandomInteger(CommentAmountRange.MIN, CommentAmountRange.MAX)}, createComment)
  };
};

const photos = Array.from({length: PHOTOS_AMOUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(photos);
