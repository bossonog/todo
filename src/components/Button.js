export class Button {
  constructor({
    elem,
    type = 'button',
    title = '',
    classList = [],
    validationFunctions = [],
    onClick = () => { }
  }) {
    this.elem = elem;
    this.type = type;
    this.title = title;
    this.classList = classList;
    this.validationFunctions = validationFunctions;
    this.onClick = onClick;

    this.wrapper = null;
    this.button = null;
    this.errorBox = null;

    this.init();
  }

  init = () => {
    this.wrapper = document.createElement('div');

    this.wrapper.classList.add('button');

    this.classList.forEach((c) => this.wrapper.classList.add(c));

    this.button = document.createElement('button');

    this.button.classList.add('button-control');

    this.button.addEventListener('click', this.handleClick);

    this.button.textContent = this.title;

    this.errorBox = document.createElement('div');

    this.errorBox.classList.add('button-error');

    this.wrapper.append(this.button);
    this.wrapper.append(this.errorBox);
  }

  handleClick = () => {

  }

  render = () => {
    this.elem.append(this.wrapper);
  }
}