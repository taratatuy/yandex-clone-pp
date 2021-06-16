class ScrollListener {
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

  addCallback(callback) {
    this.callbacks.push(callback);
  }

  deleteCallback(callback) {
    this.callbacks = this.callbacks.filter((active) => {
      return active != callback;
    });
  }
}
