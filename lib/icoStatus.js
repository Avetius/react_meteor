import moment from 'moment';

export default class IcoStatus {

  static compute (icoProject) {

    // scamOrSuspicious condition is prioritized
    if (IcoStatus.isScamOrSuspicious(icoProject)) {
      return 'scam-or-suspicious';
    }
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
    if (IcoStatus.isWithoutDate(icoProject) || IcoStatus.isScamOrSuspicious(icoProject)) {
      return false;
    }

    return moment().isAfter(icoProject.icoStartDatetime) && moment().isBefore(icoProject.icoEndDatetime);
  }

  static isUpcoming (icoProject) {
    if (IcoStatus.isWithoutDate(icoProject) || IcoStatus.isScamOrSuspicious(icoProject)) {
      return false;
    }
    return IcoStatus.isWithoutDate(icoProject) ? false : moment().isBefore(icoProject.icoStartDatetime);
  }

  static isFinished (icoProject) {
    if (IcoStatus.isWithoutDate(icoProject) || IcoStatus.isScamOrSuspicious(icoProject)) {
      return false;
    }
    return IcoStatus.isWithoutDate(icoProject) ? false : moment().isAfter(icoProject.icoStartDatetime) && moment().isAfter(icoProject.icoEndDatetime);
  }

  static isWithoutDate (icoProject) {
    return !icoProject.icoStartDatetime || !icoProject.icoEndDatetime;
  }

  static isScamOrSuspicious (icoProject) {
    return icoProject.ratingScore === 'scam' || icoProject.ratingScore === 'suspicious';
  }
}
