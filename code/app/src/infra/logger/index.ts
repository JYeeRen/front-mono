import debug from 'debug';
import EventEmitter from 'events';

class Logger extends EventEmitter {

  debug: debug.Debugger;

  constructor(APP_NAME?: string) {
    super();
    this.debug = debug(APP_NAME ?? '');
  }

  init(APP_NAME: string) {
    localStorage.debug = `${APP_NAME}:*`;
    this.debug = debug(APP_NAME);
    this.emit('initialized');
  }

  get auth() {
    return this.debug.extend('auth');
  }

  get infra() {
    return this.debug.extend('infra');
  }

  get net() {
    return this.debug.extend('net');
  }

}

export default new Logger();
