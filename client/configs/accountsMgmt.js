import {Meteor} from 'meteor/meteor';

export default class AccountsMgmt {

  static isAdmin () {
    // todo implement proper admin auth
    return !!Meteor.userId();
  }
}
