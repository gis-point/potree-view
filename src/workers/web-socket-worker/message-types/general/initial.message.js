import { Notification } from "../../type.decorator";

export class InitialMessage {
  date;
  metadata = {};

  constructor(message) {
    this.data = message?.data;
    this.date = message?.date_time || message?.time_created;
    this.onInit();
  }

  onInit() {}

  onUpdate() {}
}
