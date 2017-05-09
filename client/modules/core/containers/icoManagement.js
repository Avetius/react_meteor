import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';
import {Meteor} from 'meteor/meteor';

import IcoManagement from '../components/icoMgmt/icoManagement';
import UsersMgmtShared from '/lib/usersMgmtShared';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.userId()) {

    const currentUser = Meteor.user();

    onData( null, {
      userId: Meteor.userId(),
      email: UsersMgmtShared.extractEmail(currentUser),
      name: UsersMgmtShared.extractName(currentUser)
    });
  } else {
    onData( null, {
      userId: null
    });
  }

};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(IcoManagement);
