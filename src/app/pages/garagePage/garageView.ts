import Page from '../../abstract/page/page';
import { ArrCars, TCar } from '../../common/types';
import {
  getCarSVG,
  getDistanceBetweenElements,
  getSizeElement,
} from '../../common/utils';
import ModalCar from '../../components/modalCar/modalCar';
import WinnersController from '../winnersPage/winnersController';
import GarageCarControlsView from './garageCarControls/garageCarControlsView';
import GarageController from './garageController';
import { GarageControlsView } from './garageControls/garageControlsView';
import GarageState from './garageModel';
import GaragePaginationView from './garagePagination/garagePaginationView';
import GarageRaceController from './garageRace/garageRaceController';
import './garageView.scss';

export class GarageView extends Page {
  private _raceController: GarageRaceController;

  private _controllersView: GarageControlsView;

  private _paginationView: GaragePaginationView;

  constructor(
    private _state: GarageState,
    private _controller: GarageController,
    private _winnersController: WinnersController
  ) {
    super('main_garage');

    this._raceController = new GarageRaceController(
      this._state,
      this._controller,
      this._winnersController
    );
    this._controllersView = new GarageControlsView(
      this,
      this._controller,
      this._raceController
    );
    this._paginationView = new GaragePaginationView(this._state, this._controller, this);

    // event subscription
    const render = () => {
      this.render();
    };
    this._state.onChange.add(render); // add handler for render

    const startAnimation = (id: unknown) => {
      this.startAnimation(id as number);
    };
    this._state.onStartAnimation.add(startAnimation); // add handler for start drive animation

    const stopAnimation = (id: unknown) => {
      this.stopAnimation(id as number);
    };
    this._state.onStopAnimation.add(stopAnimation); // add handler for stop drive animation

    const renderResultCar = (id: unknown) => {
      this.renderResultCar(id as number);
    };
    this._state.onSetResultAnimation.add(renderResultCar); // add handler for show result

    // init
    (async () => {
      await this._controller.getCars();
    })();
  }

  public getPage(): HTMLElement {
    return this._container;
  }

  private render() {
    this.destroy();

    this.renderTitle(
      `Garage (${this._state.getCarsNumber()}) - page #${this._state.getCarsPage()}`
    );

    this.renderGarage(this._state.getCars());
  }

  private renderGarage(cars: ArrCars) {
    this._container.append(this._controllersView.render());
    this._container.append(this.renderCars(cars));
    this._container.append(this._paginationView.render());
  }

  private renderCars(cars: ArrCars) {
    const wrapper = document.createElement('div');
    wrapper.className = 'garage';
    this._container.append(wrapper);

    this._state.clearTracks();

    if (cars)
      cars.forEach((car) => {
        const div = document.createElement('div');
        div.className = 'garage__line-wrapper';

        div.append(this.renderLine(car));

        wrapper.append(div);
      });

    return wrapper;
  }

  private renderLine(car: TCar) {
    const div = document.createElement('div');
    div.className = 'garage__line';

    const controls = new GarageCarControlsView(
      car,
      this._state,
      this,
      this._controller,
      this._raceController,
      this._winnersController
    );

    div.append(controls.render());

    const p = document.createElement('p');
    p.className = 'garage__car-name';
    p.textContent = `${car.name} (${car.id})`;
    div.append(p);

    const htmlCar = this.renderCar(car);
    div.append(htmlCar);

    const finish = this.renderFinish();
    div.append(finish);

    this._state.addTrack(car.id, { car: htmlCar, finish: finish, text: p }, controls);

    return div;
  }

  private renderCar(car: TCar) {
    const div = document.createElement('div');
    div.className = 'garage__car';

    div.innerHTML = getCarSVG(car.color);

    div.addEventListener('click', () => {
      new ModalCar('Update Car', car, async (newCar: TCar) => {
        await this._controller.updateCar(newCar);
        await this._winnersController.getWinners();
      });
    });

    return div;
  }

  private renderFinish() {
    const div = document.createElement('div');
    div.className = 'garage__finish';

    return div;
  }

  private startAnimation(id: number) {
    const { time, track } = this._state.getAnimation(id);
    const { car, finish } = track;

    const width = getSizeElement(car).width + getSizeElement(finish).width;
    let distance = getDistanceBetweenElements(car, finish) - width / 2;
    const dt = (width * time) / distance;
    distance += width;
    const dx = distance / (time + dt);

    let start = 0;
    const step = (timestamp: number) => {
      if (start === 0) start = timestamp;

      const progress = Math.round((timestamp - start) * dx);

      car.style.transform = 'translate(' + Math.min(distance, progress) + 'px, -50%)';

      if (progress < distance) {
        this._state.setIDAnimation(id, window.requestAnimationFrame(step));
      }
    };

    this._state.setIDAnimation(id, window.requestAnimationFrame(step));
  }

  public stopAnimation(id: number) {
    window.cancelAnimationFrame(this._state.getAnimation(id).requestID);
  }

  public resetAnimation(id: number) {
    const car = this._state.getCar(id);
    if (car) {
      const htmlCar = this._state.getTrack(id).car;
      htmlCar.style.transform = 'translate(0px, -50%)';

      const p = this._state.getTrack(id).text;
      p.textContent = `${car.name} (${car.id})`;
    }
  }

  public resetAllAnimations() {
    const cars = this._state.getCars();
    cars.forEach((car) => {
      this.stopAnimation(car.id);
      this.resetAnimation(car.id);
    });
  }

  private renderResultCar(id: number) {
    const res = this._state.getAnimation(id).result;
    const car = this._state.getCar(id);

    if (car) {
      const p = this._state.getTrack(id).text;
      p.textContent =
        res === '' ? `${car.name} (${car.id})` : `${car.name} (${car.id}) - ${res}`;
    }
  }

  public switchDisabledControls(disabled: boolean) {
    this._controllersView.switchDisabledControls(disabled);
    this._paginationView.switchDisabledControls(disabled);
  }

  public switchDisabledStart(disabled: boolean) {
    this._controllersView.switchDisabledStart(disabled);
  }

  public switchDisabledAllControls(disabled: boolean) {
    this._controllersView.switchDisabledControls(disabled);
    this._paginationView.switchDisabledControls(disabled);

    const controls = this._state.getTrackControls();
    controls.forEach((control) => control.switchDisabledControls(disabled));
  }
}

export default GarageView;
