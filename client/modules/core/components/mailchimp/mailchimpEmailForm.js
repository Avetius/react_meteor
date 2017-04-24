/**
 *
 * cloned from https://github.com/jacted/lead-form
 *
 */

import React from 'react';

// Components
import Thanks from './thanks'
import Capture from './capture'
import ErrorCmp from './errorCmp'

// do not change this, otherwise all users see newsletter signup popup again!
var widget_id = 'widget-mc-ico01';

var widget_position = 'right';

// Styles
require('./styles.scss');

export default class MailchimpEmailForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      captured: false,
      closedAfterCapture: false,
      error: false,
      error_info: {
        title: 'Error',
        content: '<p>Something went wrong. Please reload browser and try again.</p>'
      },
      info: {
        bartitle: 'Signup for ICO weekly newsletter',
        title: 'Signup for ICO weekly newsletter',
        content: `<span>You can look forward to:
                  <ul class="in-popup-list">
                  <li>Weekly updates of upcoming and ongoing ICOs</li>
                  <li>Notifications about newly listed ICOs</li>
                  <li>Important updates of ICOindex.com features</li>
                  </ul>
                  </span>
                 `
      },
      thanks: {
        title: 'Thank you for signup!',
        content: `<p>Do you want to be part of ICOindex <strong>community</strong>?</p>
                  <p>Join the discussions on our
                  <a target="_blank" href="https://icoindex-official.herokuapp.com">ICOindex community slack</a> as well!
                  </p>
                 `
      },
      form: {
        buttonText: 'Sign up'
      }
    };

  }

  componentDidMount() {
    this.checkIfShouldPopup();
  }

  checkIfShouldPopup() {
    let isCaptured = localStorage.getItem('leadform-captured-' + widget_id);
    console.log(isCaptured);
    if (isCaptured == null) {
      this.setState({
        captured: false
      });
    } else {
      this.setState({
        captured: true,
        closedAfterCapture: true
      });
    }
  }

  openLeadCapture() {
    this.setState({
      open: true
    });
  }

  closeLeadCapture() {
    if (this.state.captured) {
      this.setState({
        open: false,
        closedAfterCapture: true
      });
    } else {
      this.setState({
        open: false
      });
      // Set error to false after 0.5s
      setTimeout(() => {
        this.setState({
          error: false
        });
      }, 501)
    }
  }

  onFormSubmit(form) {
    Meteor.call('ico.newsletter-signup', form.email, (err, result) => {
      if (err) {
        console.error(err, err.reason);
        this.setState({
          error: true
        });
      } else {
        this.setState({
          captured: true
        });
        localStorage.setItem('leadform-captured-'+widget_id, 'yes')
      }
    });

  }

  render () {
    // Wrapper class
    let leadClassName = '';

    // Open - Closed
    leadClassName += (this.state.open) ? 'open ' : 'closed ';

    // Right - Left
    leadClassName += (widget_position) ? widget_position : 'right';

    // Content
    let innerContent;
    if (!this.props.openMailchimpForm) {
      return (
        <div id="leadform-wrapper"></div>
      )
    }
    if (this.state.error) {
      innerContent = <ErrorCmp error={this.state.error_info} />
    } else if (this.state.captured && !this.state.closedAfterCapture) {
      innerContent = <Thanks thanks={this.state.thanks} />
    } else {
      innerContent = <Capture onFormSubmit={this.onFormSubmit.bind(this)} info={this.state.info} form={this.state.form} />
    }

    // If form is captured and is closed, render nothing
    if (this.state.captured && this.state.closedAfterCapture) {
      return (
        <div id="leadform-wrapper"></div>
      )
    }

    return (
      <div id="leadform-wrapper" className={leadClassName}>
        <div className="leadform-opennote" onClick={this.openLeadCapture.bind(this)}>
          <div className="leadform-opennote-title">
            {this.state.info.bartitle}
          </div>
          <div className="leadform-opennote-arrow">
            <img src="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/arrow.png" />
          </div>
        </div>
        <div className="leadform-note">
          <div className="leadform-note-inner">
            <div className="leadform-note-close" onClick={this.closeLeadCapture.bind(this)}>
              <img src="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/close.png" />
            </div>
            {innerContent}
          </div>
        </div>
      </div>
    );
  }
}
