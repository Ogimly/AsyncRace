import { ErrorMessages, ResponseStatus } from '../../common/enums';
import { errorHandler } from '../../services/errorHandler';
import RacerService from '../../services/racerService';
import WinnersState from './winnersModel';

export class WinnersController {
  constructor(
    private _state: WinnersState,
    private _racerService: RacerService = new RacerService()
  ) {}

  //* -------- WINNERS -------- *//
  public async getWinners() {
    try {
      const res = await this._racerService.getWinners(
        this._state.getWinnersPage(),
        this._state.getSortName(),
        this._state.getSortOrder()
      );

      if (!res?.data || !res.headers)
        throw new Error(`${ErrorMessages.noGetWinners} ${ErrorMessages.noData}`);

      const winners = res.data;
      this._state.setWinners(winners);

      const winnersNumber = res.headers.get('X-Total-Count');
      if (!winnersNumber)
        throw new Error(`${ErrorMessages.noGetWinners} ${ErrorMessages.noData}`);

      this._state.setWinnersNumber(+winnersNumber);

      this._state.updView();
    } catch (error) {
      // errorHandler(error);
    }
  }

  public async getCar(id: number) {
    try {
      const res = await this._racerService.getCar(id);

      if (res?.status === ResponseStatus.notFound) return false;

      return res?.data; //no render
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default WinnersController;
