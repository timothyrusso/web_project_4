class Section {
  constructor({ items, renderer }, cardElements) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(cardElements);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  setItem(element) {
    this._container.append(element);
  }
}

export default Section;
