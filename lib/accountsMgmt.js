import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class AccountsMgmt {

  static isCurrentUserAdmin () {
    return this.isAdmin(Meteor.userId(), Meteor.user());
  }

  static isAdmin (userId, user) {
    // todo add roles instead of hardcoded values
    return !!userId && user && (user.privateProfile || user.profile) && (_.includes(['pilny.ondra@gmail.com', 'jindrich.bartek@gmail.com', 'jirkageorge@protonmail.com'], this.extractEmail(user)))
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
