/*
  interface IBlock {
    addElement(): void;
  }
*/

/**
 * Functional logic of Zen component on the page. Implements IBlock interface.
 * @calss
 */
class Zen {
  constructor() {
    this.zenAreaElem = document.querySelector('.dzen__area');
  }

  /**
   * Set spinner while loading data from server.
   */
  setSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'dzen__spinner';
    this.zenAreaElem.appendChild(spinner);
  }

  /**
   * Delete spinner when got response from server.
   */
  deleteSpinner() {
    const spinner = document.querySelector('.dzen__spinner');
    this.zenAreaElem.removeChild(spinner);
  }

  /**
   * Add card element to the page.
   * @param {object} content - Response from the server.
   * @param {number} size - Css class defining cols span of the element.
   */
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
