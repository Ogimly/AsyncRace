import './button.scss';

export class Button {
  public node: HTMLButtonElement;

  constructor(className: string, text: string) {
    this.node = document.createElement('button');
    this.node.className = `button button_${className}`;
    this.node.textContent = text;
  }

  public render() {
    return this.node;
  }
}

export default Button;
