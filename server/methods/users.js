import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

import UsersMgmtServer from '../users/usersMgmtServer';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default function () {
  Meteor.methods({

    'users.addAsIcoAdmin' (userEmail, icoSlug) {
      check(icoSlug, String);
      check(userEmail, String);
      // only admin is supposed to do this action
      if (!UsersMgmtShared.isUserSuperAdmin(this.userId)) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      let user = UsersMgmtServer.findUserByEmail(userEmail);
      if (user) {
        UsersMgmtServer.setIcoMgmtRole(user._id, icoSlug);
      } else {
        throw new Meteor.Error('users.addAsIcoAdmin error', 'There is no user with that email');
      }

    },

    'users.removeAsIcoAdmin' (userEmail, icoSlug) {
      check(icoSlug, String);
      check(userEmail, String);
      // only admin is supposed to do this action
      if (!UsersMgmtShared.isUserSuperAdmin(this.userId)) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      let user = UsersMgmtServer.findUserByEmail(userEmail);
      if (user) {
        UsersMgmtServer.unsetIcoMgmtRole(user._id, icoSlug);
      } else {
        throw new Meteor.Error('users.removeAsIcoAdmin error', 'There is no user with that email');
      }
    },

    'users.addContentAdmin' (userId) {
      check(userId, String);
      if (!UsersMgmtShared.isUserSuperAdmin(this.userId)) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      UsersMgmtServer.setGlobalRole(userId, 'content-admin');
    },

    'users.deleteContentAdmin' (userId) {
      check(userId, String); console.log('userId ==', userId);
      if (!UsersMgmtShared.isUserSuperAdmin(this.userId)) {
        throw new Meteor.Error('Not authorized', 'You are not authorized to do the action.');
      }
      UsersMgmtServer.unsetGlobalRole(userId, 'content-admin');
    }

  });
}
