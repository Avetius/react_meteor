import React from 'react';
import moment from 'moment';
import i18next from 'i18next';
import {FlowRouter} from 'meteor/kadira:flow-router';
import EllipsisText from 'react-ellipsis-text';

import AccountsMgmt from '/lib/accountsMgmt';
import Countdown from './dateTimeCountdown';
import ContentWithPopover from './contentWithPopover';

import IcoStatus from '/lib/icoStatus';
import Constants from '/client/configs/constants';

export default class IcoShortItemMainRows extends React.Component {

  constructor(props) {
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

    if (IcoStatus.isOneOfIcoDateEmpty(this.props.ico) || new Date(icoStartDatetime).getTime() === Constants.pseudoDateTimeInFuture) {
      icoCountdownState = {
        icoCountdown: {
          enable: false }
      };
    } else if (IcoStatus.isDateRangeUpcoming(this.props.ico)) {
      icoCountdownState = {
        icoCountdown : {
          enable: true, message: 'ICO will start in ', date: icoStartDatetime }
      };
    } else if (IcoStatus.isDateRangeOngoing(this.props.ico)) {
      icoCountdownState = {
        icoCountdown : {
          enable: true, message: 'ICO ends in ', date: icoEndDatetime
        }
      };
    } else if (IcoStatus.isDateRangeFinished(this.props.ico)) {
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

  renderDatetime (datetime, datetimeFormat) {
    if (!datetime || new Date(datetime).getTime() === Constants.pseudoDateTimeInFuture) {
      return i18next.t('ico.dates.noDate');
    }

    if (!datetimeFormat || datetimeFormat === 'dateTime') {
      return moment(datetime).format('MMMM Do YYYY, h:mm a');
    } else if (datetimeFormat === 'dateOnly') {
      return moment(datetime).format('MMMM Do YYYY');
    }
  }

  render() {

    const FundKeeperHelpBody =
      <span>
        <p> Fund keeper describes who will be in the possession of the funds collected from the initial coin offering.</p>
        <p> - Developing team: You are sending the money directly to the team. In case this project turns out to be a scam, it will be almost impossible to refund the money. (Not secure) </p>
        <p> - Exchange: You are sending the money to a crypto-currency exchange. (Not secure) </p>
        <p> - Escrow: You are sending the money to an escrow service which will be locked by a 3rd party. If the ICO is not successful or the project is a scam and the 3rd party is a reliable person then the money will most probably be refunded to the ICO participants. (Most secure option) </p>
      </span>;

    const ProjectStatusHelpBody =
      <span>
        <p> Project status describes in which stage of development the project is. Projects start their ICO  during different stages of the project development. Putting money in to an ICO with only a concept means that you are actually giving money to someone who might not be even capable of developing something.</p>
        <p> - Concept: The team has developed a concept of an idea which is described usually in a whitepaper. The team is raising money through ICO to start developing their project. At this stage there is no working prototype.</p>
        <p> - Working prototype: The team has already developed working prototype in order to prove that the team is capable of developing something. (Usually the prototype has very limited features)</p>
        <p> - Private demo: The team has already developed a demo but the demo has not been released to the everyone yet. </p>
        <p> - Public demo: The team has already developed a demo which is available to everyone to try out. </p>
        <p> - Live: The team has already developed something that actually works and the team is looking for additional funding to further develop and grow their project </p>
      </span>;

    const ico = this.props.ico;

    return (
    <div>

      <div className="row">

        <div className="col-xs-12 col-md-7">

          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-5">

              <div className="row">
                <div className="col-xs-12 col-md-12">
                  {/*Logo*/}
                  <a href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } rel="noopener noreferrer">
                    <img className="img-responsive margin-top-sm" src={ico.icoProjectLogo || Constants.icoLogoPlaceholderURL} />
                  </a>
                </div>
              </div>
              <div className="row margin-vertical-sm">
                <div className="col-xs-8">

                  {/* TODO: impl IcoStatus*/}
                  <span className="ico-grey-text-value">Ongoing</span>
                </div>
                <div className="col-xs-4 padding-horizontal-none">

                  {/*Edit ICO*/}
                  { AccountsMgmt.isCurrentUserAdmin() ? (
                    <a href={ FlowRouter.path('ico.edit', { icoSlug: ico._id }) }>
                      <span className="h5">
                        <i className="fa fa-pencil margin-right-sm" />
                        Edit
                      </span>
                    </a> ) : ''
                  }
                </div>
              </div>

            </div>

            <div className="col-xs-12 col-sm-6 col-md-7">

              <div className="row">
                <div className="col-xs-12">

                  {/*Name - title*/}
                  <span className="ico-title-label">Name</span>
                </div>
                <div className="col-xs-12">

                  {/*Name - value*/}
                  <a href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } className="ico-text-value">
                    { ico.projectName ? ico.projectName: i18next.t('ico.rendering.fieldNA') }
                    <span className="text-uppercase">{ ico.abbreviation ? ` (${ico.abbreviation})` : ''}</span>
                  </a>
                </div>
                <div className="col-xs-12">

                  {/*One Sentence Explanation*/}
                  <div className="fixed-height ico-darker-grey-text-value">
                    <em>
                      <EllipsisText
                        text={ico.oneSentenceExplanation ? ico.oneSentenceExplanation : i18next.t('ico.rendering.fieldNA')}
                        length={200}>
                      </EllipsisText>
                    </em>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="col-xs-12 col-md-5">

          <div className="row ico-third-part-details">
            <div className="col-xs-12 col-sm-6 col-md-6">

              <div className="row">
                <div className="col-xs-12">

                  {/*Start Date - Title*/}
                  <ContentWithPopover fieldLabel="Start Date"
                                      helpText="ICO start date is date and time when you will first be able to participate in this initial coin offering.">
                    <span className="ico-title-label text-help margin-right-xs">Start Date</span>
                  </ContentWithPopover>

                </div>
                <div className="col-xs-12 margin-bottom-md">

                  {/*Start Date - Value*/}
                  <span className="ico-text-value">
                    { this.renderDatetime(ico.icoStartDatetime, ico.icoStartDatetimeFormat) }
                  </span>
                </div>

                <div className="col-xs-12 min-height-1-line">

                  {/*ICO countdown - title*/}
                  <span className="ico-title-label">
                    {this.state.icoCountdown.message || 'Countdown n/a'}
                  </span>
                </div>

                <div className="col-xs-12 min-height-1-line margin-bottom-md">

                  {/*ICO countdown - value*/}
                  {
                    this.state.icoCountdown.enable ? (
                      <Countdown givenDate={this.state.icoCountdown.date}
                                 help={{ enable: false }}
                                 afterTimeout={this.reComputeCountdowns.bind(this)}/>
                    ) : 'not available'
                  }
                </div>
                <div className="col-xs-12">

                  {/*Fund Keeper - Title*/}
                  <ContentWithPopover fieldLabel="Fund keeper"
                                      helpText={FundKeeperHelpBody}>
                    <span className="ico-title-label text-help margin-right-xs">Fund keeper</span>
                  </ContentWithPopover>

                </div>
                <div className="col-xs-12">

                  {/*Fund Keeper - Value*/}
                  <span className="ico-text-value">
                    {ico.fundKeeper ? i18next.t('ico.fundKeeper.' + ico.fundKeeper): i18next.t('ico.rendering.fieldNA')}
                  </span>
                </div>
              </div>

            </div>

            <div className="col-xs-12 col-sm-6 col-md-6">

              <div className="row">
                <div className="col-xs-12">

                  {/*End Date - Title*/}
                  <ContentWithPopover fieldLabel="End Date"
                                      helpText="ICO end date is date and time after which you will not be able to participate in initial coin offering.">
                    <span className="ico-title-label text-help margin-right-xs">End Date</span>
                  </ContentWithPopover>

                </div>
                <div className="col-xs-12 margin-bottom-md">

                  {/*End Date - Value*/}
                  <span className="ico-text-value">
                    { this.renderDatetime(ico.icoEndDatetime, ico.icoEndDatetimeFormat) }
                  </span>
                </div>
                <div className="col-xs-12">

                  {/*Bonus countdown - title*/}
                  <span className="ico-title-label">
                    {this.state.bonusCountdown.message || '10% bonus ends in'}
                  </span>
                </div>
                <div className="col-xs-12 min-height-1-line margin-bottom-md">

                  {/*Bonus countdown - value -- TODO replace this by real bonus value*/}
                  {
                    this.state.icoCountdown.enable ? (
                      <Countdown givenDate={this.state.icoCountdown.date}
                                 afterTimeout={this.reComputeCountdowns.bind(this)}/>
                    ) : 'not available'
                  }

                </div>
                <div className="col-xs-12">

                  {/*ProjectStatus - Title*/}
                  <ContentWithPopover fieldLabel="Project status"
                                      helpText={ProjectStatusHelpBody}>
                    <span className="ico-title-label text-help margin-right-xs">Project status</span>
                  </ContentWithPopover>

                </div>
                <div className="col-xs-12">

                  {/*ProjectStatus - Value*/}
                  <span className="ico-text-value">
                    {ico.projectStatus ? i18next.t('ico.projectStatus.' + ico.projectStatus): i18next.t('ico.rendering.fieldNA')}
                  </span>

                </div>
              </div>

            </div>
          </div>

          <div className="row margin-vertical-sm">

            { this.props.isProfile ?
              <div>
                { ico.icoWebsiteLink && (IcoStatus.isOngoing(ico) || IcoStatus.isUpcoming(ico)) ?

                  <div className="col-xs-12 col-md-6 col-md-push-4">
                    {/*Participate in ICO - PRIMARY*/}
                    <a className="btn btn-ico-primary" target="_blank" href={ico.icoWebsiteLink}
                       rel="noopener noreferrer" disabled={!ico.icoWebsiteLink}>Participate in ICO</a>
                  </div>
                  : ''
                }
              </div>
              :
              <div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                  {/*Participate in ICO -- secondary*/}
                  { IcoStatus.isOngoing(ico) || IcoStatus.isUpcoming(ico) ?
                    <div className="btn-ico-secondary-wrapper-outer">
                      <div className="btn-ico-secondary-wrapper-inner flex-vertical-center flex-horizontal-center">
                        <a className="btn btn-ico-secondary" target="_blank" href={ico.icoWebsiteLink}
                           rel="noopener noreferrer" disabled={!ico.icoWebsiteLink}>
                          Participate in ICO
                        </a>
                      </div>
                    </div>
                    : ''
                  }
                </div>

                <div className="col-xs-12 col-sm-6 col-md-6">
                  {/*Detail button*/}
                  <div>
                    <a className="btn btn-ico-primary" href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) }
                       rel="noopener noreferrer">
                      <span className="vertical-align-middle">Details</span>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>

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
