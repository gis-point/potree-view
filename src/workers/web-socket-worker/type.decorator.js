import {
  AuthWebSocketWorker,
  GeneralWebSocketWorker,
} from './web.socket.worker';

export function SetMessageType(e) {
  return (a) => {
    a.messageType = e;
    a.prototype.messageType = e;
  };
}

export function SetPushNotificationTheme(e) {
  return (a) => {
    a.pushNotificationTheme = e;
    a.getPushNotificationTheme = () => `notification-${e}`;

    if (a.prototype) {
      a.prototype.pushNotificationTheme = e;
      a.prototype.getPushNotificationTheme = () => `notification-${e}`;
    }
  };
}

export function PushNotification() {
  return (a) => {
    a.pushNotification = true;
    a.prototype.pushNotification = true;
  };
}

export function Notification() {
  return (a) => {
    a.notification = true;
    a.prototype.notification = true;
  };
}

export function UpdateWebSocketMessage() {
  return (a) => {
    a.updateWebSocketMessage = true;
    a.prototype.updateWebSocketMessage = true;
  };
}

export function ChatWebSocketMessage() {
  return (a) => {
    a.chatWebSocketMessage = true;
    a.prototype.chatWebSocketMessage = true;
  };
}

export function ReadAfterActiveAction(callBack) {
  return (a) => {
    a.readAfterActiveAction = true;
    a.prototype.readAfterActiveAction = true;
    a.prototype.readAfterActiveActionCallBack = callBack;
  };
}

export function DeleteAfterActiveAction(callBack) {
  return (a) => {
    a.prototype.deleteAfterActiveActionCallBack = callBack;
  };
}

export function TimeForCloseIfInactive(e) {
  return (a) => {
    a.timeForClose = e;
    a.prototype.timeForClose = e;
  };
}

export function NotificationSetImage(e) {
  return (a) => {
    a.notificationImage = e;
    a.prototype.notificationImage = e;
  };
}

export function NotificationSetUserImage() {
  return (a) => {
    a.notificationUserImage = true;
    a.prototype.notificationUserImage = true;
  };
}

export function SetActions(e = []) {
  return (a) => {
    a.actions = e;
    if (a.prototype) {
      a.prototype.actions = e;
    }
  };
}

export function AuthWebSocketMessage() {
  return (a) => {
    if (!AuthWebSocketWorker.messages) {
      AuthWebSocketWorker.messages = [];
    }
    AuthWebSocketWorker.messages.push(a);
  };
}

export function GeneralWebSocketMessage() {
  return (a) => {
    if (!GeneralWebSocketWorker.messages) {
      GeneralWebSocketWorker.messages = [];
    }
    GeneralWebSocketWorker.messages.push(a);
  };
}
