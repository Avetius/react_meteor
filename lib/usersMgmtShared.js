import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class UsersMgmtShared {

  static isCurrentUserSuperAdmin() {
    if (!Meteor.userId()) {
      return false;
    }
    return this.isUserSuperAdmin(Meteor.userId());
  }

  static isUserSuperAdmin(userId) {
    if (!userId) {
      console.error('isUserSuperAdmin error: ', 'userId is required');
    }
    return Roles.userIsInRole(userId, 'super-admin', 'global');
  }

  static isUserIcoAdmin(userId, icoSlug) {
    if (!userId || !icoSlug) {
      console.error('isUserIcoAdmin error: ', 'userId and icoSlug are required');
    }
    return Roles.userIsInRole(userId, 'ico-admin', icoSlug);
  }

  static isCurrentUserIcoAdmin(icoSlug) {
    if (!icoSlug) {
      console.error('isCurrentUserIcoAdmin error: ', 'icoSlug is required');
    }
    if (!Meteor.userId()) {
      return false;
    }
    return this.isUserIcoAdmin(Meteor.userId(), icoSlug);
  }

  static isUserAnyIcoAdmin(userId) {
    if (!userId) {
      console.error('isUserAnyIcoAdmin error: ', 'userId is required');
    }
    const roleGroups = Roles.getGroupsForUser(userId);
    const res = _.findIndex(roleGroups, (roleGroupName) => {
      return _.indexOf(Roles.getRolesForUser(userId, roleGroupName), 'ico-admin') !== -1;
    });
    return res !== -1;
  }

  static isCurrentUserAnyIcoAdmin() {
    if (!Meteor.userId()) {
      return false;
    }
    return this.isUserAnyIcoAdmin(Meteor.userId());
  }

  static isUserContentAdmin(userId) {
    if (!userId) {
      console.error('isUserContentAdmin error: ', 'userId is required');
    }
    return Roles.userIsInRole(userId, 'content-admin', 'global');
  }

  static isCurrentUserContentAdmin() {
    if (!Meteor.userId()) {
      return false;
    }
    return this.isUserContentAdmin(Meteor.userId());
  }

  static getManagedIcosSlugs (userObj) {
    if (!userObj || !userObj.roles) {
      console.error('getManagedIcosSlugs error', 'userObj and userObj.roles are required');
      return [];
    }

    const managedIcoSlugsObj = _.pickBy(userObj.roles, function (roles) {
      return _.includes(roles, 'ico-admin')
    });

    return _.keys(managedIcoSlugsObj);
  }

  static extractEmail(userObj) {
    if (!userObj || (!userObj.privateProfile && !userObj.profile)) {
      console.error('extractEmail error: ', 'userObj and at last privateProfile or profile are required');
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

  static extractName(userObj) {
    if (!userObj || (!userObj.publicProfile && !userObj.profile)) {
      console.error('extractName error: ', 'userObj and at last publicProfile or profile are required');
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

  static extractLongLivedUserId(userObj) {
    if (!userObj || !userObj.longLivedUserId) {
      console.error('extractLongLivedUserId error: ', 'userObj and longLivedUserId are required');
    }
    return userObj.longLivedUserId;
  }

  static findUserByEmail (emailAddress) {
    if (!emailAddress) {
      console.error('findUserByEmail error: ', 'emailAddress is required');
    }
    return Meteor.users.findOne({ $or:
      [
        {'privateProfile.linkedIn.email': emailAddress},
        {'privateProfile.facebook.email': emailAddress}
      ]
    });
  }

  static findUserByLongLivedUserId (longLivedUserId) {
    if (!longLivedUserId) {
      console.error('findUserByLongLivedUserId error: ', 'longLivedUserId is required');
    }
    return Meteor.users.findOne({longLivedUserId: longLivedUserId});
  }
}
