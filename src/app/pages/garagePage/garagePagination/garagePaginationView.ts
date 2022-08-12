import { CARS_LIMIT } from '../../../common/const';
import Pagination from '../../../abstract/pagination/pagination';
import GarageController from '../garageController';
import GarageState from '../garageModel';
import GaragePaginationController from './garagePaginationController';
import GarageView from '../garageView';

export class GaragePaginationView extends Pagination {
  private _paginationController: GaragePaginationController;

  constructor(
    private _state: GarageState,
    private _garageController: GarageController,
    private _garageView: GarageView
  ) {
    super();

    this._paginationController = new GaragePaginationController(
      this._state,
      this._garageController
    );

    this._btnTop.node.addEventListener('click', () => {
      this._paginationController.topCarPage();
    });
    this._btnPrev.node.addEventListener('click', () => {
      this._paginationController.prevCarPage();
    });
    this._btnNext.node.addEventListener('click', () => {
      this._paginationController.nextCarPage();
    });
    this._btnBottom.node.addEventListener('click', () => {
      this._paginationController.bottomCarPage();
    });
  }

  public render() {
    const currPage = this._state.getCarsPage();
    const pages = Math.ceil(this._state.getCarsNumber() / CARS_LIMIT);

    this.checkButtons(pages, currPage);
    this._garageView.switchDisabledStart(false);

    return this._container;
  }

  public switchDisabledControls(disabled: boolean) {
    this._btnTop.node.disabled = disabled;
    this._btnPrev.node.disabled = disabled;
    this._btnNext.node.disabled = disabled;
    this._btnBottom.node.disabled = disabled;

    if (!disabled) {
      const currPage = this._state.getCarsPage();
      const pages = Math.ceil(this._state.getCarsNumber() / CARS_LIMIT);

      this.checkButtons(pages, currPage);
    }
  }
}

export default GaragePaginationView;
