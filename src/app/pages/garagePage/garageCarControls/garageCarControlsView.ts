import { TCar } from '../../../common/types';
import Button from '../../../components/button/button';
import ModalCar from '../../../components/modalCar/modalCar';
import WinnersController from '../../winnersPage/winnersController';
import GarageController from '../garageController';
import GarageState from '../garageModel';
import GarageRaceController from '../garageRace/garageRaceController';
import GarageView from '../garageView';

export class GarageCarControlsView {
  private _btnUpdCar: Button = new Button('round', 'U');

  private _btnDelCar: Button = new Button('round', 'X');

  private _btnStart: Button = new Button('round', 'A');

  private _btnStop: Button = new Button('round', 'B');

  private _container: HTMLElement;

  constructor(
    private _car: TCar,
    private _state: GarageState,
    private _garageView: GarageView,
    private _garageController: GarageController,
    private _raceController: GarageRaceController,
    private _winnersController: WinnersController
  ) {
    this._container = document.createElement('div');
    this._container.className = 'garage__controls';

    this._btnStop.node.disabled = true;

    this._container.append(this._btnUpdCar.render());
    this._container.append(this._btnStart.render());
    this._container.append(this._btnDelCar.render());
    this._container.append(this._btnStop.render());

    // upd & del car
    this._btnUpdCar.node.addEventListener('click', () => {
      new ModalCar('Update Car', this._car, async (newCar: TCar) => {
        await this._garageController.updateCar(newCar);
        await this._winnersController.getWinners();
      });
    });
    this._btnDelCar.node.addEventListener('click', async () => {
      this._btnDelCar.node.disabled = true;

      await this._garageController.delCar(this._car);
      await this._winnersController.getWinners();

      this._btnDelCar.node.disabled = false;
    });

    // start & stop car engine
    this._btnStart.node.addEventListener('click', async () => {
      const id = this._car.id;

      if (this._state.getAnimation(id).started) this._garageView.stopAnimation(id);
      this._garageView.resetAnimation(id);

      this._btnStart.node.disabled = true;
      this._btnUpdCar.node.disabled = true;
      this._btnDelCar.node.disabled = true;

      this._garageView.switchDisabledControls(true);

      await this._raceController.startCar(id);

      this._btnStop.node.disabled = false;

      await this._raceController.driveCar(id);

      this._garageView.switchDisabledControls(false);
      this._garageView.switchDisabledStart(false);
    });
    this._btnStop.node.addEventListener('click', async () => {
      await this._raceController.stopCar(this._car.id);

      this._garageView.resetAnimation(this._car.id);

      this._btnStart.node.disabled = false;
      this._btnUpdCar.node.disabled = false;
      this._btnDelCar.node.disabled = false;

      this._btnStop.node.disabled = true;

      this._garageView.switchDisabledControls(false);
      this._garageView.switchDisabledStart(false);
    });
  }

  public render() {
    return this._container;
  }

  public switchDisabledControls(disabled: boolean) {
    if (disabled) {
      this._btnUpdCar.node.disabled = disabled;
      this._btnDelCar.node.disabled = disabled;
      this._btnStart.node.disabled = disabled;
      this._btnStop.node.disabled = disabled;
    } else {
      this._btnStop.node.disabled = disabled;
    }
  }
}

export default GarageCarControlsView;
