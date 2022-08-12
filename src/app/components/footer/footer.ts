import './footer.scss';

export class Footer {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('footer');
    this.container.className = 'footer-app';
  }

  public render(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'footer__inner';
    this.container.append(wrapper);

    let link = document.createElement('a');
    link.className = 'footer__link';
    link.href = 'https://github.com/ogimly';
    wrapper.append(link);

    let div = document.createElement('div');
    div.className = 'footer__github';
    div.textContent = '2022';
    link.append(div);

    link = document.createElement('a');
    link.className = 'footer__link';
    link.href = 'https://rs.school/js/';
    wrapper.append(link);

    div = document.createElement('div');
    div.className = 'footer__rss';
    link.append(div);

    return this.container;
  }
}
export default Footer;
