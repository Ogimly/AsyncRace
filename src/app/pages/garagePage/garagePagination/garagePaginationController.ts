import { CARS_LIMIT } from '../../../common/const';
import { errorHandler } from '../../../services/errorHandler';
import GarageController from '../garageController';
import GarageState from '../garageModel';

export class GaragePaginationController {
  constructor(private _state: GarageState, private _controller: GarageController) {}

  //* -------- PAGINATION -------- *//
  public topCarPage() {
    this.moveCarPage(1);
  }

  public prevCarPage() {
    this.moveCarPage(Math.max(1, this._state.getCarsPage() - 1));
  }

  public nextCarPage() {
    this.moveCarPage(this._state.getCarsPage() + 1);
  }

  public bottomCarPage() {
    this.moveCarPage(Math.ceil(this._state.getCarsNumber() / CARS_LIMIT));
  }

  public async moveCarPage(n: number) {
    try {
      this._state.setCarsPage(n);

      await this._controller.getCars();

      this._state.updView();
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default GaragePaginationController;
