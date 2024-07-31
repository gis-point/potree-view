import { w3cwebsocket } from 'websocket';

import { createQueryStringFromObject } from '../utils-worker';

export class WebSocketWorker {
  messages = [];
  callbacks = [];
  options = {};
  instance;

  constructor(options) {
    this.options = options;
  }

  connect(params) {
    if (this.instance) {
      console.warn('WebSocketWorker connect - have instance');
      return;
    }
    this.instance = new w3cwebsocket(
      this.options.SOCKET_URL + createQueryStringFromObject(params),
      this.options.SOCKET_ECHO_PROTOCOL
    );

    this.instance.onerror = (e) => {
      console.log('Connection Error', e);
    };

    this.instance.onopen = (e) => {
      console.log('WebSocket Client Connected');
    };

    this.instance.onclose = (e) => {
      console.log('echo-protocol Client Closed');
    };

    this.instance.onmessage = (e) => {
      this._createElementAndCallHandler(this._parseSocketData(e.data).message);
    };

    window.createElementAndCallHandler =
      this._createElementAndCallHandler.bind(this);
  }

  disconnect() {
    this.instance?.close();
    this.instance = null;
  }

  registerCallback(callback, messageType = null) {
    // callback should be unique
    if (typeof callback !== 'function') {
      console.warn('registerCallback is not a function');
      return this;
    }

    if (this.callbacks.find((func) => func.name === callback.name)) {
      console.warn('registerCallback already use');
      return this;
    }

    if (!messageType) {
      this.callbacks.push(callback);
    } else {
      this.callbacks.push({
        messageType: messageType,
        callbackFunction: callback,
      });
    }

    return this;
  }

  destroyCallback(destroyCallback) {
    if (typeof destroyCallback !== 'function') {
      console.warn('destroyCallback is not a function');
      return this;
    }

    const index = this.callbacks.findIndex((callback) => {
      if (typeof callback === 'function') {
        return callback.name === destroyCallback.name;
      } else if (
        typeof callback === 'object' &&
        typeof callback.callbackFunction === 'function'
      ) {
        return callback.callbackFunction.name === destroyCallback.name;
      }
    });

    if (index > -1) {
      this.callbacks.splice(index, 1);
      console.log('destroyCallback destroyed successfully');
    }

    return this;
  }

  _handleCallback(element) {
    this.callbacks.forEach((item) => {
      if (typeof item === 'function') {
        item(element);
      } else if (typeof item === 'object') {
        if (Object.getPrototypeOf(element)?.messageType == item?.messageType) {
          item.callbackFunction(element);
        }
      }
    });
  }

  _createElementAndCallHandler(message) {
    if (!message) {
      console.warn('_createElementAndCallHandler = message false');
      return;
    }
    const constructor = this.messages.find(
      (item) =>
        item.messageType === message.message_type ||
        item.messageType === message.new_message_type
    ); // TODO delete new_message_type
    if (!constructor) {
      console.warn('_createElementAndCallHandler = socket type not found');
      return;
    }
    this._handleCallback(new constructor(message));
  }

  _parseSocketData(e) {
    try {
      return JSON.parse(e);
    } catch (e) {
      console.warn('e => something wrong parseSocketData', e);
      return false;
    }
  }
}

export class AuthWebSocketWorker extends WebSocketWorker {
  constructor(options) {
    super(options);
    this.messages = AuthWebSocketWorker.messages || this.messages;
  }
}

export class GeneralWebSocketWorker extends WebSocketWorker {
  constructor(options) {
    super(options);
    this.messages = GeneralWebSocketWorker.messages || this.messages;
  }
}
