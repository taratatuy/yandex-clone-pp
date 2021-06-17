/**
 * Page scroll listener. Observerable pattern but collect not objects
 * implements IObserver but callback functions.
 * @class
 */
class ScrollListener {
  /**
   * Add scroll listener to the page.
   * @param {number} timeout - Minimal time between events [ms] (throttle).
   */
  constructor(timeout = 100) {
    this.timeout = timeout;
    this.passFlag = true;
    this.callbacks = [];

    this._setListener();
  }

  _setListener() {
    window.addEventListener('scroll', () => {
      if (!this.passFlag) return;

      this.passFlag = false;

      this.callbacks.forEach((callback) => {
        callback();
      });

      setTimeout(() => {
        this.passFlag = true;
      }, this.timeout);
    });
  }

  /**
   * Subscribe a function.
   * @param {function} callback -  Function to be called.
   */
  addCallback(callback) {
    this.callbacks.push(callback);
  }

  /**
   * Unsubscribe a function.
   * @param {function} callback - Function previously added.
   */
  deleteCallback(callback) {
    this.callbacks = this.callbacks.filter((active) => {
      return active != callback;
    });
  }
}
