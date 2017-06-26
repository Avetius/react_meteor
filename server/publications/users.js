import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';

export default function () {

  Meteor.publish('users.currentUserInfo', function () {
    return Meteor.users.find({ _id: this.userId },
      { fields: { publicProfile: 1, privateProfile: 1 }}
    );
  });

  Meteor.publish('users.all', function () {
    return Meteor.users.find({});
  });
}

