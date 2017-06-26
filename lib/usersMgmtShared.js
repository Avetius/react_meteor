import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class UsersMgmtShared {

  static isCurrentUserSuperAdmin () {
    return this.isUserSuperAdmin(Meteor.userId());
  }

  static isUserSuperAdmin (userId) {
    return Roles.userIsInRole(userId, 'super-admin', 'global');
  }

  static isUserIcoAdmin(userId, icoSlug) {
    return Roles.userIsInRole(userId, 'ico-admin', icoSlug);
  }

  static isUserContentAdmin(userId) {
    return Roles.userIsInRole(userId, 'content-admin', 'global');
  }

  static isCurrentUserContentAdmin() {
    return this.isUserContentAdmin(Meteor.userId());
  }

  static getManagedIcosSlugs (userObj) {
    if (!userObj || !userObj.roles) {
      return [];
    }

    const managedIcoSlugsObj = _.pickBy(userObj.roles, function(roles) {
      return _.includes(roles, 'ico-admin')
    });

    return _.keys(managedIcoSlugsObj);
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

  static getChangeRequestAuthor (authorEmail) {
    return Meteor.users.findOne({ $or:
      [
        {'privateProfile.linkedIn.email': authorEmail},
        {'privateProfile.facebook.email': authorEmail}
      ]
    }, );
  }
}
