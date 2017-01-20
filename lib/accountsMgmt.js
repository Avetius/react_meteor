import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class AccountsMgmt {

  static isCurrentUserAdmin () {
    return AccountsMgmt.isAdmin(Meteor.userId(), Meteor.user());
  }

  static isAdmin (userId, user) {
    // todo add roles instead of hardcoded values
    return !!userId && user && user.profile && (_.includes(['pilny.ondra@gmail.com', 'jindrich.bartek@gmail.com'], user.profile.email))
  }
}
