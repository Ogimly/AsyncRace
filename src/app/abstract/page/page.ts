export abstract class Page {
  protected _container: HTMLElement;

  constructor(className: string) {
    this._container = document.createElement('div');
    this._container.className = className;
  }

  protected renderTitle(title: string) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'main__title';
    titleEl.textContent = title;

    this._container.append(titleEl);
  }

  protected abstract getPage(): HTMLElement;

  public destroy(): void {
    this._container.innerHTML = '';
  }
}
export default Page;
