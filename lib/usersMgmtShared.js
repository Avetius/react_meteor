import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class UsersMgmtShared {

  static isCurrentUserAdmin () {
    return this.isAdmin(Meteor.userId());
  }

  static isAdmin (userId) {
    return Roles.userIsInRole(userId, 'super-admin', 'global');
  }

  static isUserIcoAdmin(userId, icoSlug) {
    return Roles.userIsInRole(userId, 'ico-admin', icoSlug + '-mgmt');
  }

  static extractEmail (userObj) {
    if (!userObj || (!userObj.privateProfile && !userObj.profile)) {
      return null;
    }

    if (userObj.privateProfile && userObj.privateProfile.linkedIn) {
      return userObj.privateProfile.linkedIn.email;
    } else if (userObj.privateProfile && userObj.privateProfile.facebook) {
      return userObj.privateProfile.facebook.email;
    } else if (userObj.profile) {
      return userObj.profile.email;
    } else {
      return null;
    }
  }

  static extractName (userObj) {
    if (!userObj || (!userObj.publicProfile && !userObj.profile)) {
      return null;
    }

    if (userObj.publicProfile) {
      return userObj.publicProfile.name;
    } else if (userObj.profile) {
      return userObj.profile.name;
    } else {
      return null;
    }
  }
}
