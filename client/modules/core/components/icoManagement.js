import React from 'react';
import {Meteor} from 'meteor/meteor';

import Constants from '/client/configs/constants';
import UsersMgmtShared from '/lib/usersMgmtShared';

export default class IcoManagement extends React.Component {

  loginWithLinkedIn (event) {
    event.preventDefault();
    Meteor.loginWithLinkedIn({
      clientId: '865q1dtogjm6s8',
      redirect_uri: 'http://icoindex.com',
      loginStyle: 'popup' }, (...args) => {
    });
  }

  loginWithFacebook (event) {
    event.preventDefault();
    Meteor.loginWithFacebook({
      appId: '264767840607984',
      redirect_uri: 'http://icoindex.com',
      loginStyle: 'popup',
      requestPermissions: ['public_profile', 'email']
    }, (...args) => {
    });
  }

  logout (event) {
    event.preventDefault();
    Meteor.logout();
  }

  render() {

    const currentUser = Meteor.user();
    console.log('currentUser:', currentUser);
    const email = UsersMgmtShared.extractEmail(currentUser);
    const name = UsersMgmtShared.extractName(currentUser);

    return <div>

      { this.props.userId ?

        <div className="panel panel-default panel-box">
          <div className="panel-body padding-vertical-sm">

            <div className="row margin-top-md">
              <div className="col-xs-12 col-sm-6">
                Logged in as:
                <span className="margin-left-sm h5"><b>{name}</b></span>
                <span className="margin-left-sm h6">({email})</span>
              </div>

              <div className="col-xs-12 col-sm-6">
                <a href={''} className="btn btn-ico-primary" onClick={this.logout}>
                  <span className="vertical-align-middle">Logout</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      : '' }


      <div className="row">
        <div className="col-xs-10 col-xs-push-1 col-sm-4 col-md-3">

          <div className="row margin-top-md">
            <div className="col-xs-12">
              { !this.props.userId ?
                <a href={''} className="" onClick={this.loginWithLinkedIn}>
                  <img className="img-responsive" src={Constants.assetsUrls.socialSites.linkedInLoginButton} alt="Login with LinkedIn" />
                </a>
                : ''}
            </div>
          </div>

          <div className="row margin-top-lg">
            <div className="col-xs-12">
              { !this.props.userId ?
                <a href={''} className="" onClick={this.loginWithFacebook}>
                  <img className="img-responsive" src={Constants.assetsUrls.socialSites.facebookLoginButton} alt="Login with Facebook" />
                </a>
                : ''}
            </div>
          </div>

        </div>
      </div>
    </div>;
  }

}
