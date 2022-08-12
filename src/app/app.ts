import { RecordRouts } from './common/types';
import GarageController from './pages/garagePage/garageController';
import GarageState from './pages/garagePage/garageModel';
import GarageView from './pages/garagePage/garageView';
import HelpView from './pages/helpPage/helpPageView';
import WinnersController from './pages/winnersPage/winnersController';
import WinnersState from './pages/winnersPage/winnersModel';
import WinnersView from './pages/winnersPage/winnersView';
import Router from './router';
import AppView from './view';

export class App {
  private _view: AppView;

  private _routs: RecordRouts;

  private _router: Router;

  constructor() {
    // models
    const garageState = new GarageState();
    const winnersState = new WinnersState();

    // view
    this._view = new AppView();

    // controllers
    const garageController = new GarageController(garageState);
    const winnersController = new WinnersController(winnersState);

    // router
    this._routs = {
      garage: new GarageView(garageState, garageController, winnersController),
      winners: new WinnersView(winnersState, winnersController),
      help: new HelpView(),
    };

    this._router = new Router(this._view, this._routs);
  }

  public start() {
    this._router.run();
  }
}

export default App;
