const fetching = Symbol('fetching');
const synched = Symbol('synched');

export const EVENT_START = 'sync:start';
export const EVENT_STOP = 'sync:stop';

export default {
  init() {
    this.listenTo(this, 'request', this._onStartRequest);
    this.listenTo(this, 'sync', this._onStopRequest);
  },

  _onStartRequest() {
    this[fetching] = true;
    this[synched] = false;
    this.trigger(EVENT_START);
  },

  _onStopRequest() {
    this[fetching] = false;
    this[synched] = true;
    this.trigger(EVENT_STOP);
  },

  isFetching() {
    return this[fetching];
  },

  isSynchronized() {
    return this[synched];
  },
};
