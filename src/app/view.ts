import Footer from './components/footer/footer';
import Header from './components/header/header';
import './view.scss';

export class AppView {
  private _header: Header;

  private _main: HTMLElement;

  private _footer: Footer;

  constructor() {
    // view components
    this._header = new Header();
    document.body.append(this._header.render());

    this._main = AppView.createContainer();
    document.body.append(this._main);

    this._footer = new Footer();
    document.body.append(this._footer.render());
  }

  private static createContainer() {
    const container = document.createElement('main');
    container.className = 'main-app';

    return container;
  }

  public mainRender(renderedPage: HTMLElement) {
    this._main.innerHTML = '';
    this._main.append(renderedPage);
  }
}

export default AppView;
