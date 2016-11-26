'use strict';

class Controller {

  constructor(notificationSvc) {
    this.notificationSvc = notificationSvc;
  }

  $onInit() {
    this.notificationSvc
      .getList()
      .then(data => {
        this.notifications = data.notifications;
        this.meta = data.meta;
      });
  }

  open() {
    this.notificationSvc
      .open()
      .then(() => {
        this.meta.new = 0;
      });
  }

}

Controller.$inject = ['NotificationService'];

export default Controller;
