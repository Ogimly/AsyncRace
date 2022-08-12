import { ErrorMessages, ResponseStatus } from '../../../common/enums';
import { errorHandler } from '../../../services/errorHandler';
import RacerService from '../../../services/racerService';
import WinnersController from '../../winnersPage/winnersController';
import GarageController from '../garageController';
import GarageState from '../garageModel';

export class GarageRaceController {
  constructor(
    private _state: GarageState,
    private _controller: GarageController,
    private _winnersController: WinnersController,
    private _racerService = new RacerService()
  ) {}

  //* -------- ENGINE -------- *//
  public async startCar(id: number) {
    try {
      const startTime = Date.now();

      const res = await this._racerService.startEngine(id);

      if (!res?.data)
        throw new Error(
          `${ErrorMessages.noStartEngine} [car id=${id}] ${ErrorMessages.noData}`
        );

      const { velocity, distance } = res.data;
      const time = Math.round(distance / velocity);
      const track = this._state.getTrack(id);

      this._state.startAnimation(id, time, track, startTime);
    } catch (error) {
      errorHandler(error);
    }
  }

  public async driveCar(id: number) {
    try {
      const success = await this._racerService.switchDriveMode(id);

      if (success?.status === ResponseStatus.internalServerError) {
        if (this._state.getAnimation(id).started) {
          this._state.setResultAnimation(id, 'engine breakdown');
          this._state.stopAnimation(id);
        }

        return { id: id, result: 0 };
      } else {
        if (!(success?.status === ResponseStatus.ok))
          throw new Error(
            `${ErrorMessages.noStartDrive} [car id=${id}] (${success?.status}) ${success?.statusText}`
          );

        if (this._state.getAnimation(id).started) {
          // const timeA = this._state.getAnimation(id).time / 1000; // only animation duration time
          const time = (Date.now() - this._state.getAnimation(id).startTime) / 1000;

          this._state.setResultAnimation(id, `time: ${time}`);

          return { id: id, result: time };
        }
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  public async driveTest(id: number) {
    return new Promise<{ id: number; result: number }>((resolve, reject) => {
      this._racerService
        .switchDriveMode(id)
        .then((success) => {
          if (success?.status === ResponseStatus.internalServerError) {
            if (this._state.getAnimation(id).started) {
              this._state.setResultAnimation(id, 'engine breakdown');
              this._state.stopAnimation(id);
            }
            reject(false);
          } else {
            if (!(success?.status === ResponseStatus.ok)) reject();

            if (this._state.getAnimation(id).started) {
              // const time = this._state.getAnimation(id).time / 1000; // only animation duration time
              const time = (Date.now() - this._state.getAnimation(id).startTime) / 1000;

              this._state.setResultAnimation(id, `time: ${time}`);

              resolve({ id: id, result: time });
            }
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  }

  public async stopCar(id: number) {
    try {
      await this._racerService.stopEngine(id);

      this._state.setResultAnimation(id, '');
      this._state.stopAnimation(id);
    } catch (error) {
      errorHandler(error);
    }
  }

  //* -------- RACE -------- *//
  public async StartRace() {
    try {
      const cars = this._state.getCars();

      if (cars.length === 0) throw new Error(ErrorMessages.noCarsOnPage);

      const resArr = cars.map(async (car) => {
        await this.startCar(car.id);
        return this.driveTest(car.id);
      });

      const res = await Promise.any(resArr).catch(() => {
        throw new Error(ErrorMessages.noCarsFinished);
      });

      if (!res) throw new Error(ErrorMessages.noCarsFinished);

      const { id, result } = res;
      this._state.setResultAnimation(id, `WINNER! time: ${result}`);

      this.setWinner(id, result);

      await Promise.allSettled(resArr);
      //
    } catch (error) {
      if (error) errorHandler(error);
    }
  }

  private async setWinner(id: number, newTime: number) {
    const winner = await this._racerService.getWinner(id);

    if (winner?.status === ResponseStatus.notFound) {
      // add new line
      await this._racerService.createWinner({ id: id, wins: 1, time: newTime });

      await this._winnersController.getWinners();
    } else if (winner?.status === ResponseStatus.ok) {
      // upd data
      const { wins, time } = winner.data;
      newTime = Math.min(newTime, time);
      await this._racerService.updateWinner(id, { wins: wins + 1, time: newTime });

      await this._winnersController.getWinners();
    }
  }

  public async ResetRace() {
    try {
      const cars = this._state.getCars();

      const resArr = cars.map((car) => this.stopCar(car.id));
      await Promise.all(resArr);

      this._controller.getCars();
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default GarageRaceController;
