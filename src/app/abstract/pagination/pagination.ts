import Button from '../../components/button/button';
import './pagination.scss';

export abstract class Pagination {
  protected _btnTop: Button = new Button('pagination', '<< Top');

  protected _btnPrev: Button = new Button('pagination', '< Previous');

  protected _btnNext: Button = new Button('pagination', 'Next >');

  protected _btnBottom: Button = new Button('pagination', 'Bottom >>');

  protected _container: HTMLElement;

  constructor() {
    this._container = document.createElement('div');
    this._container.className = 'pagination';

    this._container.append(this._btnTop.render());
    this._container.append(this._btnPrev.render());
    this._container.append(this._btnNext.render());
    this._container.append(this._btnBottom.render());
  }

  protected checkButtons(pages: number, currPage: number) {
    pages = Math.max(1, pages);

    if (currPage === 1) {
      this._btnPrev.node.disabled = true;
      this._btnTop.node.disabled = true;
    } else {
      this._btnPrev.node.disabled = false;
      this._btnTop.node.disabled = false;
    }
    if (currPage === pages) {
      this._btnNext.node.disabled = true;
      this._btnBottom.node.disabled = true;
    } else {
      this._btnNext.node.disabled = false;
      this._btnBottom.node.disabled = false;
    }
  }
}

export default Pagination;
