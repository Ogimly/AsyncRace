import Signal from '../../common/signal';
import {
  ArrCars,
  RecordTracks,
  RecordCarAnimation,
  TCar,
  RecordControls,
  ArrayCarControls,
} from '../../common/types';
import { errorHandler } from '../../services/errorHandler';
import GarageCarControlsView from './garageCarControls/garageCarControlsView';

export class GarageState {
  private _cars: ArrCars = [];

  private _carsNumber = 0;

  private _carsPage = 1;

  private _tracks: RecordTracks = {};

  private _controls: ArrayCarControls = [];

  private _animations: RecordCarAnimation = {};

  public onChange = new Signal();

  public onStartAnimation = new Signal();

  public onStopAnimation = new Signal();

  public onSetResultAnimation = new Signal();

  //* ---------------------- *//
  public updView() {
    this.onChange.emit(this);
  }

  //* -------- CARS -------- *//
  public getCars() {
    return [...this._cars];
  }

  public setCars(arr: ArrCars) {
    this._cars = [...arr];
  }

  public getCarsLength() {
    return this._cars.length;
  }

  public getCarsNumber() {
    return this._carsNumber;
  }

  public setCarsNumber(carsNumber: number) {
    this._carsNumber = carsNumber;
  }

  public getCarsPage() {
    return this._carsPage;
  }

  public setCarsPage(n: number) {
    this._carsPage = n;
  }

  public getCar(id: number) {
    const car = this._cars.filter((el) => el.id === id);

    try {
      if (car.length === 1) {
        return car[0];
      } else {
        throw Error(`Car id ${id} is not ${car.length === 0 ? 'found' : 'unique'} !`);
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  public setCar({ id, name, color }: TCar) {
    const car = this._cars.filter((el) => el.id === id);

    try {
      if (car.length === 1) {
        car[0].name = name;
        car[0].color = color;
      } else {
        throw Error(`Car id ${id} is not ${car.length === 0 ? 'found' : 'unique'} !`);
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  //* -------- TRACKS -------- *//
  public clearTracks() {
    this._tracks = {};
    this._controls = [];
  }

  public addTrack(id: number, track: RecordControls, controls: GarageCarControlsView) {
    this._tracks[id] = track;
    this._controls.push(controls);
  }

  public getTrackControls() {
    return [...this._controls];
  }

  public getTrack(id: number) {
    return { ...this._tracks[id] };
  }

  //* -------- ANIMATION -------- *//
  public getAnimation(id: number) {
    if (this._animations[id]) return { ...this._animations[id] };
    return {
      started: false,
      time: 0,
      startTime: 0,
      track: {},
      requestID: 0,
      result: '',
    };
  }

  public setIDAnimation(id: number, requestID: number) {
    this._animations[id].requestID = requestID;
  }

  public setResultAnimation(id: number, result: string) {
    if (this._animations[id]) {
      this._animations[id].result = result;

      this.onSetResultAnimation.emit(id);
    }
  }

  public startAnimation(
    id: number,
    time: number,
    track: RecordControls,
    startTime: number
  ) {
    this._animations[id] = {
      started: true,
      time: time,
      startTime: startTime,
      track: track,
      requestID: 0,
      result: '',
    };

    this.onStartAnimation.emit(id);
  }

  public stopAnimation(id: number) {
    if (this._animations[id]) {
      this._animations[id].started = false;
      this._animations[id].time = 0;
      this._animations[id].startTime = 0;
      this._animations[id].track = {};

      this.onStopAnimation.emit(id);

      this._animations[id].requestID = 0;
    }
  }
}

export default GarageState;
