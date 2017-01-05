import moment from 'moment';

export default class IcoStatus {

  static compute (icoProject) {

    if (IcoStatus.isWithoutDate(icoProject)) {
      return 'without-date';
    }
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
    return IcoStatus.isWithoutDate(icoProject) ? false :  moment().isAfter(icoProject.icoStartDatetime) && moment().isBefore(icoProject.icoEndDatetime);
  }

  static isUpcoming (icoProject) {
    return IcoStatus.isWithoutDate(icoProject) ? false : moment().isBefore(icoProject.icoStartDatetime);
  }

  static isFinished (icoProject) {
    return IcoStatus.isWithoutDate(icoProject) ? false : moment().isAfter(icoProject.icoStartDatetime) && moment().isAfter(icoProject.icoEndDatetime);
  }

  static isWithoutDate (icoProject) {
    return !icoProject.icoStartDatetime || !icoProject.icoEndDatetime;
  }
}
