import { Button } from '../../components/button/button';
import './modal.scss';

export abstract class Modal {
  protected _container: HTMLElement;

  protected _button: HTMLElement;

  protected _window: HTMLElement;

  constructor(str: string) {
    document.body.classList.add('lock');

    this._container = document.createElement('div');
    this._container.className = 'modal';
    document.body.append(this._container);

    this._window = document.createElement('div');
    this._window.className = 'modal__window';
    this._container.append(this._window);

    const text = document.createElement('p');
    text.className = 'modal__text';
    text.textContent = str;
    this._window.append(text);

    this._button = new Button('modal', 'X').render();
    this._window.append(this._button);

    this._button.addEventListener('click', this.close.bind(this));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  protected close() {
    this._container.remove();
    document.body.classList.remove('lock');
  }
}

export default Modal;
