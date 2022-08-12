import AppRequest from '../services/appRequest';
import { errorHandler } from '../services/errorHandler';
import { Routs, SortingName, SortingOrder } from './enums';

export const BASE = 'http://localhost:3000';

export const CARS_LIMIT = 7;
export const CARS_ADD = 100;
export const WINNERS_LIMIT = 10;
export const DEFAULT_KEY = Routs.help;

export const SORTING_NAME = SortingName.wins;
export const SORTING_ORDER = SortingOrder.desc;

type CarEntries = [string, Array<string>];
export let DB_CARS: Array<CarEntries> = [];

const getDBCars = async () => {
  try {
    const res = await new AppRequest().getRequest('./assets/carsModel.json', {});

    if (res?.ok) DB_CARS = Object.entries(res?.data);
  } catch (error) {
    errorHandler(error);
  }
};
getDBCars();
