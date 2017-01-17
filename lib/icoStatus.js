import moment from 'moment';
import _ from 'lodash';

export default class IcoStatus {

  static compute (icoProject) {
    // sequence in this function is significant!

    // scam or suspicious condition is prioritized
    if (IcoStatus.isScam(icoProject)) {
      return 'scam';
    }
    if (IcoStatus.isSuspicious(icoProject)) {
      return 'suspicious';
    }
    // lets put incomplete ico dates to upcoming category
    if (IcoStatus.isOneOfIcoDateEmpty(icoProject)) {
      return 'upcoming';
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
    if (IcoStatus.isOneOfIcoDateEmpty(icoProject) || IcoStatus.isScam(icoProject) || IcoStatus.isSuspicious(icoProject)) {
      return false;
    }

    return IcoStatus.isDateRangeOngoing(icoProject);
  }

  static isUpcoming (icoProject) {
    if (IcoStatus.isScam(icoProject) || IcoStatus.isSuspicious(icoProject)) {
      return false;
    }

    // lets put incomplete ico dates to upcoming category
    if (IcoStatus.isOneOfIcoDateEmpty(icoProject)) {
      return true;
    }
    return IcoStatus.isDateRangeUpcoming(icoProject);
  }

  static isFinished (icoProject) {
    if (IcoStatus.isOneOfIcoDateEmpty(icoProject) || IcoStatus.isScam(icoProject) || IcoStatus.isSuspicious(icoProject)) {
      return false;
    }
    return IcoStatus.isDateRangeFinished(icoProject);
  }


  static isOneOfIcoDateEmpty (icoProject) {
    return !icoProject.icoStartDatetime || !icoProject.icoEndDatetime;
  }

  static isScam (icoProject) {
    return icoProject.ratingScore === 'scam';
  }

  static isSuspicious (icoProject) {
    return icoProject.ratingScore === 'suspicious';
  }


  static filter (collection, state) {
    return _.filter(collection, IcoStatus.getProperFilterMethod(state));
  }

  static getProperFilterMethod (filterParam) {
    const config = {
      upcoming: IcoStatus.isUpcoming,
      ongoing: IcoStatus.isOngoing,
      finished: IcoStatus.isFinished,
      suspicious: IcoStatus.isSuspicious,
      scam: IcoStatus.isScam
    };
    return config[filterParam];
  }


  // todo move to separate class
  static isDateRangeOngoing (icoProject) {
    return moment().isAfter(icoProject.icoStartDatetime) && moment().isBefore(icoProject.icoEndDatetime);
  }

  static isDateRangeUpcoming (icoProject) {
    return moment().isBefore(icoProject.icoStartDatetime);
  }

  static isDateRangeFinished (icoProject) {
    return moment().isAfter(icoProject.icoStartDatetime) && moment().isAfter(icoProject.icoEndDatetime);
  }

  static computeEntityState (icoProject) {
    return IcoStatus.isIcoPublished(icoProject) ? 'published' : 'concept'
  }

  static isIcoPublished (icoProject) {
    return icoProject.entityState.state === 'published'
  }

  static isIcoConcept (icoProject) {
    return icoProject.entityState.state === 'concept'
  }

  // todo
  static isIcoFavourite (icoProject) {

  }
}
