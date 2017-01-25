import {Accounts} from 'meteor/std:accounts-ui';

export default ({Meteor, FlowRouter}) => {

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

}
