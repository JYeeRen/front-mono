import debug from 'debug';

class Logger {

  debug: debug.Debugger;

  constructor(ns?: string) {
    this.debug = debug(ns ?? 'app');
  }

  get auth() {
    return this.debug.extend('auth');
  }

  get boot() {
    return this.infra.extend('boot');
  }

  get infra() {
    return this.debug.extend('infra');
  }

  get net() {
    return this.debug.extend('net');
  }

  get store() {
    return this.debug.extend('store');
  }

  init(appName: string) {
    this.debug = debug(appName);
    localStorage.debug = `${appName}:*`;
  }

}

export default new Logger();
