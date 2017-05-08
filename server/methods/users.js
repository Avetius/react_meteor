import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import _ from 'lodash';

import UsersMgmtServer from '../users/usersMgmtServer';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default function () {
  Meteor.methods({

    'users.addAsIcoAdmin' (userEmail, icoSlug) {
      // only admin is supposed to do this action
      if (!UsersMgmtShared.isAdmin(this.userId)) {
        return;
      }
      let user = UsersMgmtServer.findUserByEmail(userEmail);
      UsersMgmtServer.setIcoMgmtRole(user._id, icoSlug);
    },

    'users.removeAsIcoAdmin' (userEmail, icoSlug) {
      // only admin is supposed to do this action
      if (!UsersMgmtShared.isAdmin(this.userId)) {
        return;
      }
      let user = UsersMgmtServer.findUserByEmail(userEmail);
      //console.log(user);
      UsersMgmtServer.unsetIcoMgmtRole(user._id, icoSlug);
    }

  });
}
