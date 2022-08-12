import { WINNERS_LIMIT } from '../../../common/const';
import { errorHandler } from '../../../services/errorHandler';
import WinnersController from '../winnersController';
import WinnersState from '../winnersModel';

export class WinnersPaginationController {
  constructor(private _state: WinnersState, private _controller: WinnersController) {}

  //* -------- PAGINATION -------- *//
  public topWinnersPage() {
    this.moveWinnersPage(1);
  }

  public prevWinnersPage() {
    this.moveWinnersPage(this._state.getWinnersPage() - 1);
  }

  public nextWinnersPage() {
    this.moveWinnersPage(this._state.getWinnersPage() + 1);
  }

  public bottomWinnersPage() {
    this.moveWinnersPage(Math.ceil(this._state.getWinnersNumber() / WINNERS_LIMIT));
  }

  private async moveWinnersPage(n: number) {
    try {
      this._state.setWinnersPage(n);

      await this._controller.getWinners();

      this._state.updView();
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default WinnersPaginationController;
