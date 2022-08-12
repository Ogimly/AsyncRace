import Button from '../button/button';
import './header.scss';

export class Header {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('header');
    this.container.className = 'header-app';
  }

  public render(): HTMLElement {
    const inner = document.createElement('div');
    inner.className = 'header__inner';
    this.container.append(inner);

    let link = document.createElement('a');
    link.className = 'header__link';
    link.href = '#garage';
    link.textContent = '';
    inner.append(link);

    let btn = new Button('link', 'Garage').render();
    link.append(btn);

    const title = document.createElement('h1');
    title.className = 'header__title';
    title.textContent = 'Async Race';
    inner.append(title);

    link = document.createElement('a');
    link.className = 'header__link';
    link.href = '#winners';
    link.textContent = '';
    inner.append(link);

    btn = new Button('link', 'Winners').render();
    link.append(btn);

    link = document.createElement('a');
    link.className = 'header__link';
    link.href = '#help';
    link.textContent = '';
    this.container.append(link);

    btn = new Button('link-help', '?').render();
    link.append(btn);

    return this.container;
  }
}
export default Header;
