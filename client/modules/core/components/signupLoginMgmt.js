import React from 'react';
import {Meteor} from 'meteor/meteor';

export default class SignupLoginMgmt extends React.Component {

  loginWithLinkedIn () {
    Meteor.loginWithLinkedIn({
      clientId: '865q1dtogjm6s8',
      redirect_uri: 'http://icoindex.com',
      loginStyle: 'popup' }, (...args) => {
      //console.log(...args);
    });
  }

  loginWithFacebook () {
    Meteor.loginWithFacebook({
      appId: '264767840607984',
      redirect_uri: 'http://icoindex.com',
      loginStyle: 'popup',
      requestPermissions: ['public_profile', 'email']
    }, (...args) => {
      //console.log(...args);
    });
  }

  logout () {
    Meteor.logout();
  }

  render() {

    return <div>

      { !Meteor.userId() ? <button onClick={this.loginWithLinkedIn}>Login with LinkedIn</button> : ''}
      { !Meteor.userId() ? <button onClick={this.loginWithFacebook}>Login with Facebook</button> : ''}

      { Meteor.userId() ? <button onClick={this.logout}>Logout</button> : ''}
    </div>;
  }

}
