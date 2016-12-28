import React from 'react';
import moment from 'moment';
import i18next from 'i18next';
import {FlowRouter} from 'meteor/kadira:flow-router';

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

    const FundKeeperHelpBody =
      <span>
        Fund keeper describes who will be in the possession of the funds collected from the initial coin offering. <br />
        - Developing team: You are sending the money directly to the team. In case this project turns out to be a scam, it will be almost impossible to refund the money. (Not secure) <br />
        - Exchange: You are sending the money to a crypto-currency exchange. (Not secure) <br />
        - Escrow: You are sending the money to an escrow service which will be locked by a 3rd party. If the ICO is not successful or the project is a scam and the 3rd party is a reliable person then the money will most probably be refunded to the ICO participants. (Most secure option)
      </span>;
    const ProjectStatusHelpBody =
      <span>Project status describes in which stage of development the project is. Projects start their ICO  during different stages of the project development. Putting money in to an ICO with only a concept means that you are actually giving money to someone who might not be even capable of developing something.<br />
        - Concept: The team has developed a concept of an idea which is described usually in a whitepaper. The team is raising money through ICO to start developing their project. At this stage there is no working prototype.<br />
        - Working prototype: The team has already developed working prototype in order to prove that the team is capable of developing something. (Usually the prototype has very limited features)<br />
        - Private demo: The team has already developed a demo but the demo has not been released to the everyone yet. <br />
        - Public demo: The team has already developed a demo which is available to everyone to try out. <br />
        - Live: The team has already developed something that actually works and the team is looking for additional funding to further develop and grow their project <br />
      </span>;

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <h4 className="margin-vertical-xs">
              <a href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } className="cursor-pointer">
                { ico.projectName ? ico.projectName: i18next.t('ico.rendering.fieldNA') }
                <span className="text-uppercase">{ ico.abbreviation ? ` (${ico.abbreviation})` : ''}</span>
              </a>
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <em>{ico.oneSentenceExplanation ? ico.oneSentenceExplanation : i18next.t('ico.rendering.fieldNA')}</em>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="Start Date"
                                helpText="ICO start date is date and time when you will first be able to participate in this initial coin offering.">
              <span className="text-help margin-right-xs">Start Date:</span>
              </ContentWithPopover>
              {moment(ico.icoStartDatetime).format("dddd, MMMM Do YYYY, h:mm a")}
          </div>
          <div className="col-xs-12 col-md-6">
            <ContentWithPopover fieldLabel="End Date"
                                helpText="ICO end date is date and time after which you will not be able to participate in initial coin offering.">
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
                           help={{ enable: false }}
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
                                helpText={FundKeeperHelpBody}>
              <span className="text-help margin-right-xs">Fund keeper:</span>
            </ContentWithPopover>
            {ico.fundKeeper ? i18next.t('ico.fundKeeper.' + ico.fundKeeper): i18next.t('ico.rendering.fieldNA')}
          </div>
          <div className="col-xs-12 col-md-4">

            <ContentWithPopover fieldLabel="Project status"
                                helpText={ProjectStatusHelpBody}>
              <span className="text-help margin-right-xs">Project status:</span>
            </ContentWithPopover>
            <strong>
              {ico.projectStatus ? i18next.t('ico.projectStatus.' + ico.projectStatus): i18next.t('ico.rendering.fieldNA')}
            </strong>

          </div>

          { this.props.isProfile ?
            <div className="col-xs-12 col-md-2 tmp-relative-top-minus-5px">
              <a className="btn btn-warning" target="_blank" href={ico.icoWebsiteLink}
                 rel="noopener noreferrer" disabled={!ico.icoWebsiteLink}>Invest</a>
            </div>
           : ''
          }


        </div>

      </div>
    );
  }
}

IcoShortItemMainRows.defaultProps = {
  ico: {
    icoEvents: [],
    coFounders: []
  }
};
