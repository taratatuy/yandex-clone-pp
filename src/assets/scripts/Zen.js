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
    div.className = `dzen__card _span_${size} zen-card`;
    this._appendContent(div, content);

    this.zenAreaElem.appendChild(div);
  }

  _appendContent(div, content) {
    // TODO: refactor the function to append concrete structur of the card content
    // as header, image, text and author. Mb there are some parser so content should be
    // responce from the server.

    // For example:

    const template = `
      <div class="zen-card__header">
          <img src=${content.avatarLink} class="zen-card__avatar"></img>
          <div class="zen-card__name">${content.cardName}</div>
      </div>
      <a href="#" class="zen-card__main">
          <img src=${content.imgLink} class="zen-card__img"></img>
          <div class="zen-card__title">${content.cardTitle}</div>
          <div class="zen-card__text">${content.cardText}</div>
      </a>
      <div class="zen-card__timepast">${content.cardTimepast}</div>
      <div class="zen-card__footer"></div>
    `;

    div.insertAdjacentHTML('afterBegin', template);
  }
}
