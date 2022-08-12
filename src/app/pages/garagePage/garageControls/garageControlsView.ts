import { CARS_ADD } from '../../../common/const';
import { TCar } from '../../../common/types';
import { getRandomCar } from '../../../common/utils';
import Button from '../../../components/button/button';
import ModalCar from '../../../components/modalCar/modalCar';
import GarageController from '../garageController';
import GarageRaceController from '../garageRace/garageRaceController';
import GarageView from '../garageView';

export class GarageControlsView {
  private _btnAddCar: Button = new Button('control', 'Add new car');

  private _btnAddCars: Button = new Button('control', `Add ${CARS_ADD} cars`);

  private _btnRace: Button = new Button('control', 'Start race');

  private _btnReset: Button = new Button('control', 'Reset');

  private _container: HTMLElement;

  constructor(
    private _garageView: GarageView,
    private _garageController: GarageController,
    private _raceController: GarageRaceController
  ) {
    this._container = document.createElement('div');
    this._container.className = 'pagination';

    this._container.append(this._btnAddCar.render());
    this._container.append(this._btnAddCars.render());
    this._container.append(this._btnRace.render());
    this._container.append(this._btnReset.render());

    this._btnAddCar.node.addEventListener('click', () => {
      new ModalCar('Add New Car', getRandomCar(), async (newCar: TCar) => {
        await this._garageController.addCar(newCar);
      });
    });

    this._btnAddCars.node.addEventListener('click', async () => {
      await this._garageController.addCars();
    });

    this._btnRace.node.addEventListener('click', async () => {
      this._garageView.resetAllAnimations();
      this._garageView.switchDisabledAllControls(true);

      await this._raceController.StartRace();

      this._garageView.switchDisabledAllControls(false);
    });

    this._btnReset.node.addEventListener('click', async () => {
      await this._raceController.ResetRace();

      this._btnRace.node.disabled = false;
    });
  }

  public render() {
    return this._container;
  }

  public switchDisabledControls(disabled: boolean) {
    this._btnAddCar.node.disabled = disabled;
    this._btnAddCars.node.disabled = disabled;
    this._btnRace.node.disabled = disabled;
    this._btnReset.node.disabled = disabled;

    if (!disabled) this._btnRace.node.disabled = true;
  }

  public switchDisabledStart(disabled: boolean) {
    this._btnRace.node.disabled = disabled;
  }
}

export default GarageControlsView;
