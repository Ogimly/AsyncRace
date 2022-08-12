import { SORTING_NAME, SORTING_ORDER } from '../../common/const';
import { SortingName, SortingOrder } from '../../common/enums';
import Signal from '../../common/signal';
import { ArrWinners } from '../../common/types';

export class WinnersState {
  private _winners: ArrWinners = [];

  private _winnersNumber = 0;

  private _winnersPage = 1;

  private _sort = SORTING_NAME;

  private _order = SORTING_ORDER;

  public onChange = new Signal();

  //* ---------------------- *//
  public updView() {
    this.onChange.emit(this);
  }

  //* -------- SORTING -------- *//
  public getSortName() {
    return this._sort;
  }

  public setSortName(name: SortingName) {
    this._sort = name;
  }

  public getSortOrder() {
    return this._order;
  }

  public setSortOrder(order: SortingOrder) {
    this._order = order;
  }

  //* -------- WINNERS -------- *//
  public getWinners() {
    return [...this._winners];
  }

  public setWinners(arr: ArrWinners) {
    this._winners = [...arr];
  }

  public getWinnersNumber() {
    return this._winnersNumber;
  }

  public setWinnersNumber(winnersNumber: number) {
    this._winnersNumber = winnersNumber;
  }

  public getWinnersPage() {
    return this._winnersPage;
  }

  public setWinnersPage(n: number) {
    this._winnersPage = n;
  }
}

export default WinnersState;
