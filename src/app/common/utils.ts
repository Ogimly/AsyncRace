// import { carsBrand } from './const';
import { DB_CARS } from './const';
import { TCar } from './types';

export const getSizeElement = (element: HTMLElement) => {
  const data = element.getBoundingClientRect();
  return {
    width: data.width,
    height: data.height,
  };
};

const getPositionAtCenter = (element: HTMLElement) => {
  const data = element.getBoundingClientRect();
  return {
    x: data.left + data.width / 2,
    y: data.top + data.height / 2,
  };
};
export const getDistanceBetweenElements = function (a: HTMLElement, b: HTMLElement) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) + Math.pow(aPosition.y - bPosition.y, 2)
  );
};

const getRandomCarName = () => {
  const i = Math.floor(Math.random() * DB_CARS.length);
  const brand = DB_CARS[i][0];
  const modelArr = DB_CARS[i][1];
  const model = modelArr[Math.floor(Math.random() * modelArr.length)];
  return `${brand} ${model}`;
};

const getRandomCarColor = () => {
  const digits = '0123456789ABCDEF';
  let res = '#';

  for (let i = 0; i < 6; i++) {
    res += digits[Math.floor(Math.random() * 16)];
  }

  return res;
};

export const getRandomCar = (): TCar => {
  return {
    id: 0,
    name: getRandomCarName(),
    color: getRandomCarColor(),
  };
};

export const getCarSVG = (color: string) => {
  return `<svg class="car-svg" fill=${color}>
  <use xlink:href="./assets/sprite.svg#car"></use>
</svg>`;
};
