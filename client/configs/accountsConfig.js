import { Accounts as AccountsClient } from 'meteor/accounts-base'

export default ({Meteor, FlowRouter}) => {

  AccountsClient.onLogin(function () {
    console.log('user is logged in');
    FlowRouter.go('ico.home');
  });

  AccountsClient.onLogout(function () {
    console.log('user is logged out');
    FlowRouter.go('ico.home');
  });

}
