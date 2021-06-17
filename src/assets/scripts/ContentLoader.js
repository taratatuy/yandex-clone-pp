/**
 * A class that contain logic for request and append content to the page.
 * @class
 */
class ContentLoader {
  /**
   * @param {IBlock} block - Class with addElement function.
   */
  constructor(block) {
    this.loadingFlag = false;
    this.block = block;
    this.API = new API();

    this._loadContent();
  }

  /**
   * Check if we need to load additional cards for infinite scroll.
   * @param {number} edgeGap - Pixels from top to start loading new content.
   */
  checkEdge(edgeGap = 1500) {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (scrollHeight - window.pageYOffset < edgeGap) {
      this._loadContent();
    }
  }

  _loadContent() {
    if (this.loadingFlag) return;
    this.loadingFlag = true;

    this.block.setSpinner();

    Promise.all([
      this.API.getFakeData(),
      this.API.getFakeData(),
      this.API.getDataFromServer(),
    ]).then((res) => {
      this.block.addElement(res[0], 3);
      this.block.addElement(res[1], 2);
      this.block.addElement(res[2], 5);

      this.block.deleteSpinner();
      this.loadingFlag = false;
    });
  }
}
