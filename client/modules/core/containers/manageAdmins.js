import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import UsersMgmtShared from '/lib/usersMgmtShared';

import ManageAdmins from '../components/userMgmt/manageAdmins';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('users.all').ready()) {
    let users = Meteor.users.find({}).fetch();
    users = _.map(users, (user) => {
      const name = UsersMgmtShared.extractName(user);
      const email = UsersMgmtShared.extractEmail(user);
      return {id: user._id, name: name, email: email, roles: user.roles}
    });
    if (users) {
      onData(null, { users, userId: Meteor.userId() });
    }
  } else {
    onData();
  }

};

export const depsMapper = (context, actions) => ({
  addContentAdmin: actions.users.addContentAdmin,
  removeContentAdmin: actions.users.removeContentAdmin,
  addIcoManager: actions.icoProject.addIcoManager,
  deleteIcoManager: actions.icoProject.deleteIcoManager,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ManageAdmins);