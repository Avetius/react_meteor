import {Meteor} from 'meteor/meteor';
import _ from 'lodash';

export default class AccountsMgmt {

  static isAdmin () {
    const user = Meteor.user();
    // todo add roles instead of hardcoded values
    return !!Meteor.userId() && user && user.profile && (_.includes(['pilny.ondra@gmail.com', 'jindrich.bartek@gmail.com'], user.profile.email))
  }
}
