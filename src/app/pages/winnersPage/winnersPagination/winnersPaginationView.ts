import { WINNERS_LIMIT } from '../../../common/const';
import Pagination from '../../../abstract/pagination/pagination';
import WinnersController from '../winnersController';
import WinnersState from '../winnersModel';
import WinnersPaginationController from './winnersPaginationController';

export class WinnersPaginationView extends Pagination {
  private _paginationController: WinnersPaginationController;

  constructor(
    private _state: WinnersState,
    private _winnersController: WinnersController
  ) {
    super();

    this._paginationController = new WinnersPaginationController(
      this._state,
      this._winnersController
    );

    this._btnTop.node.addEventListener('click', () => {
      this._paginationController.topWinnersPage();
    });
    this._btnPrev.node.addEventListener('click', () => {
      this._paginationController.prevWinnersPage();
    });
    this._btnNext.node.addEventListener('click', () => {
      this._paginationController.nextWinnersPage();
    });
    this._btnBottom.node.addEventListener('click', () => {
      this._paginationController.bottomWinnersPage();
    });
  }

  public render() {
    const currPage = this._state.getWinnersPage();
    const pages = Math.ceil(this._state.getWinnersNumber() / WINNERS_LIMIT);

    this.checkButtons(pages, currPage);

    return this._container;
  }
}

export default WinnersPaginationView;
