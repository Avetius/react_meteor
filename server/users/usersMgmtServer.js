import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default class UsersMgmtServer {

  static hasUserNoDefaultRoles (userObj) {
    return (_.isEmpty(userObj.roles) || _.isEmpty(userObj.roles.global));
  }

  static setDefaultGlobalRole (userId) {
    Roles.addUsersToRoles(userId, ['regular-user'], 'global');
  }

  static setGlobalRole (userId, globalRole) {
    Roles.addUsersToRoles(userId, [globalRole], 'global');
  }

  static setIcoMgmtRole (userId, icoSlug) {
    Roles.addUsersToRoles(userId, ['ico-admin'], icoSlug);
  }

  static unsetIcoMgmtRole (userId, icoSlug) {
    Roles.removeUsersFromRoles(userId, ['ico-admin'], icoSlug);
  }

  static shouldBeSuperAdmin (userObj) {

    if (!Meteor.settings.private || !Meteor.settings.private.superAdmins || !Meteor.settings.private.superAdmins.emails) {
      return false;
    }
    return _.includes(
      Meteor.settings.private.superAdmins.emails,
      UsersMgmtShared.extractEmail(userObj)
    )
  }

  static setDefaultSuperAdmins (userObj) {
    if (this.shouldBeSuperAdmin(userObj)) {
      this.setGlobalRole(userObj._id, 'super-admin');
    }
  }

  static findUserByEmail (emailAddress) {
    return Meteor.users.findOne({ $or:
      [
        {'privateProfile.linkedIn.email': emailAddress},
        {'privateProfile.facebook.email': emailAddress}
      ]
    });
  }

}
