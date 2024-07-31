import { GeneralWebSocketWorker } from "./web.socket.worker";

import * as general from "./message-types/general";

GeneralWebSocketWorker.prototype.messages = [general.NewConvertedLasFile]
GeneralWebSocketWorker.messages = [general.NewConvertedLasFile]
GeneralWebSocketWorker.prototype.notification = true
GeneralWebSocketWorker.notification = true

export const GeneralSocketWorkerInstance = new GeneralWebSocketWorker({
  SOCKET_URL: `ws://170.187.200.162:10000/ws/general/`,
});
