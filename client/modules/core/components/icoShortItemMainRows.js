import React from 'react';
import moment from 'moment';
import i18next from 'i18next';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';

import IcoStatus from '/lib/icoStatus';

export default class IcoShortItemMainRows extends React.Component {

  constructor (props) {
    super(props);
    // todo move it to separate comp or LATER to redux
    this.state = this.getCountdownState();
  }

  reComputeCountdowns () {
    this.setState(this.getCountdownState());
  }

  // todo extract to separate component icoCountdown
  getCountdownState () {
    let icoStartDatetime = this.props.ico.icoStartDatetime;
    let icoEndDatetime = this.props.ico.icoEndDatetime;
    let icoCountdownState;

    if (IcoStatus.isUpcoming(this.props.ico)) {
      icoCountdownState = {
        icoCountdown : {
          enable: true, message: 'ICO will start in ', date: icoStartDatetime }
      };
    } else if (IcoStatus.isOngoing(this.props.ico)) {
      icoCountdownState = {
        icoCountdown : {
          enable: true, message: 'ICO ends in ', date: icoEndDatetime
        }
      };
    } else if (IcoStatus.isFinished(this.props.ico)) {
      icoCountdownState = {
        icoCountdown : { enable: true, message: 'ICO has finished.' }
      };
    } else {
      console.warn('IcoCountDown is not working for this ICO item.');
      icoCountdownState = { icoCountdown: { enable: false }};
    }

    let icoEvents = this.props.ico.icoEvents;
    let bonusCountdownState = { bonusCountdown: { enable: false }};

    if (icoEvents) {
      // todo show also bonus info before ICO will start
      // todo change it to Array.prototype.find method as that is more effective
      icoEvents.forEach((event) => {
        if (event.isBonusEvent) {
          // we presume bonus events are not overlapping
          if (moment().isAfter(event.eventStartDatetime) && moment().isBefore(event.eventEndDatetime)) {
            bonusCountdownState = {
              bonusCountdown : {
                enable: true, message: event.eventName, date: event.eventEndDatetime
              }
            };
          }
        }
      });
    }

    return {
      ...icoCountdownState,
      ...bonusCountdownState
    }
  }

  render() {

    const ico = this.props.ico;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h4 className="margin-vertical-xs">{ico.projectName}<span className="text-uppercase">{` (${ico.abbreviation})`}</span></h4>
          </div>
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="Fund keeper"
                                helpText="Can be one of: Escrow, Exchange or Devs. Describing owner of the collected funds.">
              <span className="text-help margin-right-xs">Project status:</span>
            </ContentWithPopover>
            <strong>{i18next.t('ico.icoStatus.' + IcoStatus.compute(ico))}</strong>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <em>{ico.oneSentenceExplanation}</em>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="Fund keeper"
                                helpText="Can be one of: Escrow, Exchange or Devs. Describing owner of the collected funds.">
              <span className="text-help margin-right-xs">Start Date:</span>
              </ContentWithPopover>
              {moment(ico.icoStartDatetime).format("dddd, MMMM Do YYYY, h:mm a")}
          </div>
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="Fund keeper"
                                helpText="Can be one of: Escrow, Exchange or Devs. Describing owner of the collected funds.">
              <span className="text-help margin-right-xs">End Date:</span>
            </ContentWithPopover>
            {moment(ico.icoEndDatetime).format("dddd, MMMM Do YYYY, h:mm a")}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            {
              this.state.icoCountdown.enable ? (
                <Countdown givenDate={this.state.icoCountdown.date}
                           message={this.state.icoCountdown.message}
                           help={{enable: true, field: 'ICO start (example)', text: 'ICO start describe exact date and time when you will able first invest into ICO. (example)'}}
                           afterTimeout={this.reComputeCountdowns.bind(this)}/>
              ) : ''
            }
          </div>
          <div className="col-xs-12 col-md-6">
            {
              this.state.bonusCountdown.enable ? (
                <Countdown givenDate={this.state.bonusCountdown.date}
                           message={this.state.bonusCountdown.message}
                           afterTimeout={this.reComputeCountdowns.bind(this)}/>
              ) : ''
            }
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="Fund keeper"
                                helpText="Can be one of: Escrow, Exchange or Devs. Describing owner of the collected funds.">
              <span className="text-help margin-right-xs">Fund keeper:</span>
            </ContentWithPopover>
            {i18next.t('ico.fundKeeper.' + ico.fundKeeper)}
          </div>
          <div className="col-xs-12 col-md-4">

            <ContentWithPopover fieldLabel="Fund keeper"
                                helpText="Can be one of: Escrow, Exchange or Devs. Describing owner of the collected funds.">
              <span className="text-help margin-right-xs">Project status:</span>
            </ContentWithPopover>
            <strong>{i18next.t('ico.projectStatus.' + ico.projectStatus)}</strong>

          </div>

          { this.props.isProfile ?
            <div className="col-xs-12 col-md-2 tmp-relative-top-minus-5px">
              <a className="btn btn-warning" target="_blank" href={ico.icoWebsiteLink} rel="noopener noreferrer">Invest</a>
            </div>
           : ''
          }


        </div>

      </div>
    );
  }
}
