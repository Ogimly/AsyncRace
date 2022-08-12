import { ArrWinners, TWinner, TCar } from '../../common/types';
import { getCarSVG } from '../../common/utils';
import Page from '../../abstract/page/page';
import Button from '../../components/button/button';
import WinnersController from './winnersController';
import WinnersState from './winnersModel';
import WinnersPaginationView from './winnersPagination/winnersPaginationView';
import { WINNERS_LIMIT } from '../../common/const';
import { SortingName, SortingOrder } from '../../common/enums';
import './winnersView.scss';

export class WinnersView extends Page {
  private _btnWinsUp = new Button('round-small', '▲');

  private _btnWinsDown = new Button('round-small', '▼');

  private _btnTimeUp = new Button('round-small', '▲');

  private _btnTimeDown = new Button('round-small', '▼');

  private _paginationView: WinnersPaginationView;

  constructor(private _state: WinnersState, private _controller: WinnersController) {
    super('main_winners');

    this._paginationView = new WinnersPaginationView(this._state, this._controller);

    // sort buttons
    this.setActiveButtons();

    this._btnWinsUp.node.addEventListener('click', () => {
      this._state.setSortName(SortingName.wins);
      this._state.setSortOrder(SortingOrder.asc);
      this.changeSorting();
    });

    this._btnWinsDown.node.addEventListener('click', () => {
      this._state.setSortName(SortingName.wins);
      this._state.setSortOrder(SortingOrder.desc);
      this.changeSorting();
    });

    this._btnTimeUp.node.addEventListener('click', () => {
      this._state.setSortName(SortingName.time);
      this._state.setSortOrder(SortingOrder.asc);
      this.changeSorting();
    });

    this._btnTimeDown.node.addEventListener('click', () => {
      this._state.setSortName(SortingName.time);
      this._state.setSortOrder(SortingOrder.desc);
      this.changeSorting();
    });

    // event subscription
    const render = () => {
      this.render();
    };
    this._state.onChange.add(render); // add handler for render

    // init
    (async () => {
      await this._controller.getWinners();
    })();
  }

  public getPage(): HTMLElement {
    return this._container;
  }

  private render() {
    this.destroy();

    this.renderTitle(
      `Winners (${this._state.getWinnersNumber()}) - page #${this._state.getWinnersPage()}`
    );

    this.renderWinners(this._state.getWinners());
  }

  private renderWinners(winners: ArrWinners) {
    this.renderTable(winners);

    this._container.append(this._paginationView.render());
  }

  private async renderTable(winners: ArrWinners) {
    const wrapper = document.createElement('div');
    wrapper.className = 'winners';
    this._container.append(wrapper);

    const table = document.createElement('table');
    wrapper.append(table);

    table.append(this.renderTableTitle());

    const tableBody = document.createElement('tbody');
    table.append(tableBody);

    const offset = (this._state.getWinnersPage() - 1) * WINNERS_LIMIT;

    if (winners) {
      const resArr = winners.map((winner) => this._controller.getCar(winner.id));

      const cars = await Promise.all(resArr);

      winners.forEach((winner, i) => {
        const car = cars.find((el) => el.id === winner.id);

        if (car) tableBody.append(this.renderLine(winner, i + offset, car));
      });
    }
  }

  private renderTableTitle() {
    const thead = document.createElement('thead');

    const tr = document.createElement('tr');
    thead.append(tr);

    let th = document.createElement('th');
    th.textContent = '№';
    tr.append(th);

    th = document.createElement('th');
    th.textContent = 'Image of the car';
    tr.append(th);

    th = document.createElement('th');
    th.textContent = 'Name of the car';
    tr.append(th);

    th = document.createElement('th');
    th.textContent = 'Wins number ';
    th.append(this._btnWinsUp.render());
    th.append(this._btnWinsDown.render());
    tr.append(th);

    th = document.createElement('th');
    th.textContent = 'Best time in seconds ';
    th.append(this._btnTimeUp.render());
    th.append(this._btnTimeDown.render());
    tr.append(th);

    return thead;
  }

  private renderLine(winner: TWinner, n: number, { name, color }: TCar) {
    const tr = document.createElement('tr');

    let th = document.createElement('th');
    th.textContent = `${n + 1}`;
    tr.append(th);

    th = document.createElement('th');
    th.innerHTML = getCarSVG(color);
    tr.append(th);

    th = document.createElement('th');
    th.textContent = name;
    tr.append(th);

    th = document.createElement('th');
    th.textContent = `${winner.wins}`;
    tr.append(th);

    th = document.createElement('th');
    th.textContent = `${winner.time}`;
    tr.append(th);

    return tr;
  }

  private setActiveButtons() {
    const sortingName = this._state.getSortName();
    const sortingOrder = this._state.getSortOrder();

    this._btnWinsDown.node.classList.remove('active');
    this._btnWinsUp.node.classList.remove('active');
    this._btnTimeDown.node.classList.remove('active');
    this._btnTimeUp.node.classList.remove('active');

    if (sortingName === SortingName.wins) {
      if (sortingOrder === SortingOrder.desc) {
        this._btnWinsDown.node.classList.add('active');
      } else {
        this._btnWinsUp.node.classList.add('active');
      }
    } else {
      if (sortingOrder === SortingOrder.desc) {
        this._btnTimeDown.node.classList.add('active');
      } else {
        this._btnTimeUp.node.classList.add('active');
      }
    }
  }

  private async changeSorting() {
    this.setActiveButtons();
    await this._controller.getWinners();

    this.render();
  }
}

export default WinnersView;
