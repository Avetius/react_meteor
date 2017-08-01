import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default function () {

  Meteor.publish('users.currentUserInfo', function () {
    return Meteor.users.find({ _id: this.userId },
      { fields: { publicProfile: 1, privateProfile: 1, longLivedUserId: 1 }}
    );
  });

  Meteor.publish('users.all', function () {
    if (!UsersMgmtShared.isUserSuperAdmin(this.userId)) {
      throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
    }
    return Meteor.users.find({});
  });
}

