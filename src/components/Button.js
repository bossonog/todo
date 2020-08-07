export class Button {
  constructor({
    elem,
    type = 'button',
    title = '',
    classList = [],
    onClick = () => { }
  }) {
    this.elem = elem;
    this.type = type;
    this.title = title;
    this.classList = classList;
    this.onClick = onClick;

    this.button = null;

    this.init();
  }

  init = () => {
    this.button = document.createElement('button');

    this.button.classList.add('button');

    this.classList.forEach((c) => this.button.classList.add(c));

    this.button.addEventListener('click', this.handleClick);

    this.button.textContent = this.title;
  }

  handleClick = (e) => {
    this.onClick(e);
  }

  render = () => {
    this.elem.append(this.button);
  }
}