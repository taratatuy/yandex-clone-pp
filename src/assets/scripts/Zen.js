/*
  interface IBlock {
    addElement(): void;
  }
*/

class Zen {
  constructor() {
    this.zenAreaElem = document.querySelector('.dzen__area');
  }

  addElement(content, size = 5) {
    const div = document.createElement('div');
    div.className = 'dzen__card _span_' + size;
    this._appendContent(div, content);

    this.zenAreaElem.appendChild(div);
  }

  _appendContent(div, content) {
    // TODO: refactor the function to append concrete structur of the card content
    // as header, image, text and author. Mb there are some parser so content should be
    // responce from the server.
    div.innerHTML = content;
  }
}
