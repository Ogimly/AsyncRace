import { DEFAULT_KEY } from './common/const';
import { RecordRouts } from './common/types';
import { errorHandler } from './services/errorHandler';
import AppView from './view';

export class Router {
  constructor(private _view: AppView, private _routs: RecordRouts) {}

  public run() {
    this.renderPage(this.getHash());

    window.addEventListener('hashchange', () => {
      this.renderPage(this.getHash());
    });
  }

  private getHash() {
    return window.location.hash.slice(1);
  }

  private async renderPage(key: string) {
    try {
      const page = this._routs[this._routs[key] ? key : DEFAULT_KEY];

      if (!page) throw new Error(`Page '${key}' is not defined!`);

      this._view.mainRender(page.getPage());
    } catch (error) {
      errorHandler(error);
    }
  }
}
export default Router;
