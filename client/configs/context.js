import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';
import {Accounts} from 'meteor/std:accounts-ui';
import globalSubscriptions from './globalSubscriptions';

export default function () {

  // todo move to separate file
  Accounts.ui.config({
    // 'public_profile', 'email' are default values
    requestPermissions: {
      facebook: ['public_profile', 'email']
    },
    passwordSignupFields: 'EMAIL_ONLY_NO_PASSWORD',
    loginPath: FlowRouter.path('login'),
    onSignedInHook: () => FlowRouter.go('/'),
    onSignedOutHook: () => FlowRouter.go('/')
  });

  const context = {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker
  };

  globalSubscriptions(context);

  return context;
}
