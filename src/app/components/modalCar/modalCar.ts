import { TCar } from '../../common/types';
import Modal from '../../abstract/modal/modal';
import { Button } from '../button/button';
import './modalCar.scss';

export class ModalCar extends Modal {
  private _inputName: HTMLInputElement;

  private _inputColor: HTMLInputElement;

  private _ok: HTMLElement;

  constructor(str: string, car: TCar, callback: (car: TCar) => void) {
    super(str);

    const { name, color } = car;

    let label = document.createElement('label');
    label.className = 'modal__label';
    label.htmlFor = 'name';
    label.textContent = 'Input Car Name:';
    this._window.append(label);

    this._inputName = document.createElement('input');
    this._inputName.className = 'modal__input_name';
    this._inputName.id = 'name';
    this._inputName.value = name;
    this._inputName.placeholder = 'Car name...';
    this._window.append(this._inputName);

    label = document.createElement('label');
    label.className = 'modal__label';
    label.htmlFor = 'color';
    label.textContent = 'Input Car Color:';
    this._window.append(label);

    this._inputColor = document.createElement('input');
    this._inputColor.className = 'modal__input_color';
    this._inputColor.type = 'color';
    this._inputColor.id = 'color';
    this._inputColor.value = color;
    this._window.append(this._inputColor);

    const wrapper = document.createElement('div');
    wrapper.className = 'modal__buttons';
    this._window.append(wrapper);

    this._ok = new Button('control', 'Ok').render();
    wrapper.append(this._ok);

    this._ok.addEventListener('click', () => {
      this.close();

      const newCar: TCar = {
        id: car.id,
        name: this._inputName.value,
        color: this._inputColor.value,
      };

      callback(newCar);
    });

    const cancel = new Button('control', 'Cancel').render();
    wrapper.append(cancel);

    cancel.addEventListener('click', this.close.bind(this));
  }
}

export default ModalCar;
