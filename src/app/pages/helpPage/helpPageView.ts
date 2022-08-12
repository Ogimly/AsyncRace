import Page from '../../abstract/page/page';
import Button from '../../components/button/button';
import './helpPageView.scss';

export class HelpView extends Page {
  constructor() {
    super('main_help');
  }

  public getPage(): HTMLElement {
    this.destroy();

    this.renderTitle(`Welcome to Async Race! Buttons mean:`);

    const inner = document.createElement('div');
    inner.className = 'help__inner';
    this._container.append(inner);

    inner.append(
      this.renderDescribe(
        'round-no-hover',
        'U',
        'Update the car (also you can click on the car image)'
      )
    );
    inner.append(this.renderDescribe('round-no-hover', 'X', 'Delete the car'));
    inner.append(this.renderDescribe('round-no-hover', 'A', 'Start engine of the car'));
    inner.append(
      this.renderDescribe(
        'round-no-hover',
        'B',
        'Stop engine of the car and return to start'
      )
    );
    inner.append(this.renderDescribe('round-no-hover', '▲', 'Ascending sort'));
    inner.append(this.renderDescribe('round-no-hover', '▼', 'Descending sort'));
    inner.append(this.renderDescribe('round-no-hover', '?', 'Show this page'));
    inner.append(this.renderDescribe('link-no-hover', 'Garage', 'Go to the Garage page'));
    inner.append(
      this.renderDescribe('link-no-hover', 'Winners', 'Go to the Winners page')
    );

    return this._container;
  }

  private renderDescribe(className: string, name: string, description: string) {
    const div = document.createElement('div');
    div.className = 'help__description';

    div.append(new Button(className, name).render());
    const span = document.createElement('span');
    span.textContent = ` - ${description}`;
    div.append(span);

    return div;
  }
}

export default HelpView;
