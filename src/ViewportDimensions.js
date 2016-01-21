import attempt from 'lodash.attempt';
import throttle from 'lodash.throttle';

export default class ViewportDimensions {
  constructor(threshold = 250) {
    this.callbacks = [];
    this.onWindowScroll = throttle(() => this.onWindowScroll(), threshold);
    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowScroll);
  }
  destroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('resize', this.onWindowScroll);
  }
  addListener(callback) {
    this.callbacks = this.callbacks.concat(callback);
    return () => this.removeListener(callback);
  }
  removeListener(callback) {
    this.callbacks = this.callbacks.filter(c => c !== callback);
  }
  onWindowScroll() {
    this.callbacks.forEach(callback => attempt(callback));
  }
}
