import { CARS_LIMIT, CARS_ADD } from '../../common/const';
import { ErrorMessages, ResponseStatus } from '../../common/enums';
import { TCar, DescribeCar } from '../../common/types';
import { getRandomCar } from '../../common/utils';
import { errorHandler } from '../../services/errorHandler';
import RacerService from '../../services/racerService';
import GarageState from './garageModel';
import GaragePaginationController from './garagePagination/garagePaginationController';

export class GarageController {
  constructor(
    private _state: GarageState,
    private _racerService: RacerService = new RacerService(),
    private _paginationController = <GaragePaginationController>{}
  ) {
    this._paginationController = new GaragePaginationController(this._state, this);
  }

  //* -------- GARAGE -------- *//
  public async getCars() {
    try {
      const res = await this._racerService.getCars(this._state.getCarsPage());

      if (!res?.data || !res.headers)
        throw new Error(`${ErrorMessages.noGetCars} ${ErrorMessages.noData}`);

      const cars = res.data;
      this._state.setCars(cars);

      const carsNumber = res.headers.get('X-Total-Count');
      if (!carsNumber)
        throw new Error(`${ErrorMessages.noGetCars} ${ErrorMessages.noData}`);

      this._state.setCarsNumber(+carsNumber);

      this._state.updView();
    } catch (error) {
      // errorHandler(error);
    }
  }

  public async addCar(car: TCar) {
    try {
      await this._racerService.createCar(car as DescribeCar);

      if (this._state.getCarsLength() === CARS_LIMIT) {
        // need to move to last page
        this._paginationController.moveCarPage(
          Math.ceil((this._state.getCarsNumber() + 1) / CARS_LIMIT)
        );
      } else {
        // upd current page
        await this.getCars();
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  public async addCars() {
    try {
      const resArr = [];

      for (let i = 0; i < CARS_ADD; i++) {
        resArr.push(this._racerService.createCar(getRandomCar() as DescribeCar));
      }

      const res = await Promise.all(resArr);

      // count created cars
      const checked = res.filter(
        (el) => el && el.status === ResponseStatus.created
      ).length;

      if (!(checked === CARS_ADD)) throw new Error(`${ErrorMessages.noAddCar}`);

      // need to move to last page
      this._paginationController.moveCarPage(
        Math.ceil((this._state.getCarsNumber() + CARS_ADD) / CARS_LIMIT)
      );
    } catch (error) {
      errorHandler(error);
    }
  }

  public async updateCar(car: TCar) {
    try {
      await this._racerService.updateCar(car.id, car as DescribeCar);

      await this.getCars();
    } catch (error) {
      errorHandler(error);
    }
  }

  public async delCar(car: TCar) {
    try {
      await Promise.all([
        this._racerService.deleteCar(car.id),
        this._racerService.deleteWinner(car.id),
      ]);

      if (this._state.getCarsLength() === 1) {
        // need to move to last page
        this._paginationController.prevCarPage();
      } else {
        // upd current page
        await this.getCars();
      }
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default GarageController;
