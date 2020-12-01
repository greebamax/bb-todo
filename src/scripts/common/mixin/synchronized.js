import BaseModel from 'base/model';
import BaseCollection from 'base/collection';

const fetching = Symbol('fetching');
const synched = Symbol('synched');

export const EVENT_START = 'sync:start';
export const EVENT_STOP = 'sync:stop';

export default {
  init() {
    if (Object.prototype.isPrototypeOf.call(BaseCollection.prototype, this)) {
      this.listenTo(this, 'request', this._onStartRequest);
      this.listenTo(this, 'sync', this._onStopRequest);
      this.listenTo(this, 'update', this._onStopRequest);
    }

    if (Object.prototype.isPrototypeOf.call(BaseModel.prototype, this)) {
      this.listenTo(this, 'request', this._onStartRequest);
      this.listenTo(this, 'sync', this._onStopRequest);
    }
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
