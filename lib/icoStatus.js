import moment from 'moment';

export default class IcoStatus {

  static compute (icoProject) {
    if (IcoStatus.isOngoing(icoProject)) {
      return 'ongoing';
    }
    if (IcoStatus.isUpcoming(icoProject)) {
      return 'upcoming';
    }
    if (IcoStatus.isFinished(icoProject)) {
      return 'finished';
    }
  }

  static isOngoing (icoProject) {
    return moment().isAfter(icoProject.icoStartDatetime) && moment().isBefore(icoProject.icoEndDatetime);
  }

  static isUpcoming (icoProject) {
    return moment().isBefore(icoProject.icoStartDatetime);
  }

  static isFinished (icoProject) {
    return moment().isAfter(icoProject.icoStartDatetime) && moment().isAfter(icoProject.icoEndDatetime);
  }
}
