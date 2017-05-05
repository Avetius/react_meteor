import { Accounts as AccountsClient } from 'meteor/accounts-base'

export default ({Meteor, FlowRouter}) => {

  AccountsClient.onLogin(function () {
    //
  });

  AccountsClient.onLogout(function () {
    //
  });

}
