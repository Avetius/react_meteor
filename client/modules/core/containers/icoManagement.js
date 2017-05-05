import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import _ from 'lodash';
import {Meteor} from 'meteor/meteor';

import SignupLoginMgmt from '../components/signupLoginMgmt';
import IcoStatus from '/lib/icoStatus';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.userId()) {

    onData( null, {
      userId: Meteor.userId()
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
)(SignupLoginMgmt);