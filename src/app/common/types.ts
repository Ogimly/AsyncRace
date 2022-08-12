import GarageCarControlsView from '../pages/garagePage/garageCarControls/garageCarControlsView';
import GarageView from '../pages/garagePage/garageView';
import HelpView from '../pages/helpPage/helpPageView';
import WinnersView from '../pages/winnersPage/winnersView';

export type TRouts = GarageView | WinnersView | HelpView;
export type RecordRouts = Record<string, TRouts>;

export type RecordTracks = Record<number, RecordControls>;

export type RecordControls = Record<string, HTMLElement>;

export type ArrayCarControls = Array<GarageCarControlsView>;

export type MapEndpoints = ReadonlyMap<string, string>;

export type RecordCarAnimation = Record<number, CarAnimation>;
export type CarAnimation = {
  started: boolean;
  time: number;
  startTime: number;
  track: RecordControls;
  requestID: number;
  result: string;
};

export type ArrCars = Array<TCar>;
export type DescribeCar = Pick<TCar, 'name' | 'color'>;
export type TCar = {
  id: number;
  name: string;
  color: string;
};

export type ArrWinners = Array<TWinner>;
export type DescribeWinner = Pick<TWinner, 'wins' | 'time'>;
export type TWinner = {
  id: number;
  wins: number;
  time: number;
};

export type EngineProps = {
  velocity: number;
  distance: number;
};
