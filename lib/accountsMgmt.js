import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class AccountsMgmt {

  static isCurrentUserAdmin () {
    return this.isAdmin(Meteor.userId(), Meteor.user());
  }

  static isAdmin (userId, user) {
    // todo add roles instead of hardcoded values
    return !!userId && user && user.privateProfile && (_.includes(['pilny.ondra@gmail.com', 'jindrich.bartek@gmail.com', 'jirkageorge@protonmail.com'], this.extractEmail(user)))
  }

  static extractEmail (userObj) {
    if (!userObj || !userObj.privateProfile) {
      return null;
    }

    if (userObj.privateProfile.linkedIn) {
      return userObj.privateProfile.linkedIn.email;
    } else if (userObj.privateProfile.facebook) {
      return userObj.privateProfile.facebook.email;
    }
  }
}
