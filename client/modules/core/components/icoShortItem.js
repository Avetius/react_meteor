import React from 'react';
import moment from 'moment';
import Countdown from './dateTimeCountdown';

export default class IcoFrontItem extends React.Component {

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
    let icoStartDatetime = this.props.icoEntity.icoStartDatetime;
    let icoEndDatetime = this.props.icoEntity.icoEndDatetime;
    let icoCountdownState;

    if (moment().isBefore(icoStartDatetime)) {
      icoCountdownState = {
        icoCountdown : {
        enable: true, message: 'ICO will start in ', date: icoStartDatetime }
      };
    } else if (moment().isAfter(icoStartDatetime) && moment().isBefore(icoEndDatetime)) {
      icoCountdownState = {
        icoCountdown : {
        enable: true, message: 'ICO ends in ', date: icoEndDatetime
        }
      };
    } else if (moment().isAfter(icoStartDatetime) && moment().isAfter(icoEndDatetime)) {
      icoCountdownState = {
        icoCountdown : { enable: true, message: 'ICO ended.' }
      };
    } else {
      console.warn('IcoCountDown is not working for this ICO item.');
      icoCountdownState = { icoCountdown: { enable: false }};
    }

    let icoEvents = this.props.icoEntity.icoEvents;
    let bonusCountdownState = { bonusCountdown: { enable: false }};

    if (icoEvents) {
      // todo show also bonus info before ICO will start
      // todo change it to Array.prototype.find method as that is more effective
      icoEvents.forEach((event) => {
        // we presume events are not overlapping
        if (moment().isAfter(event.eventStartDatetime) && moment().isBefore(event.eventEndDatetime)) {
          bonusCountdownState = {
            bonusCountdown : {
              enable: true, message: event.eventName, date: event.eventEndDatetime
            }
          };
        }
      });
    }

    return {
      ...icoCountdownState,
      ...bonusCountdownState
    }
  }

  render() {
    const ico = this.props.icoEntity;

    // render-validation -- should be removed in long term and fix in db instead
    let icoWebsiteLink = this.props.icoEntity.icoWebsiteLink;
    icoWebsiteLink = icoWebsiteLink.substr(0, 4) === 'http' ?
      icoWebsiteLink : 'http://' + icoWebsiteLink;

    return (
      <li className="list-group-item padding-vertical-sm">
        <div className="row">
          <div className="col-xs-12 col-md-2">
            <img className="img-responsive margin-top-sm" src="/Ico_Wallpaper_2.jpg" />
          </div>
          <div className="col-xs-12 col-md-10">

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <h4 className="margin-vertical-xs">{ico.projectName}<span className="text-uppercase">{` (${ico.abbreviation})`}</span></h4>
              </div>
              <div className="col-xs-12 col-md-6">
                {`Project status: `} <strong>{ico.icoStatus}</strong>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <em>{ico.oneSentenceExplanation}</em>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-6">
                {`Start Date: ${moment(ico.icoStartDatetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}`}
              </div>
              <div className="col-xs-12 col-md-6">
                {`End Date: ${moment(ico.icoEndDatetime).format("dddd, MMMM Do YYYY, h:mm:ss a")}`}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-6">
                {
                  this.state.icoCountdown.enable ? (
                    <Countdown givenDate={this.state.icoCountdown.date}
                               message={this.state.icoCountdown.message}
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
              <div className="col-xs-12">
                {`Fund keeper: ${ico.fundKeeper}`}
              </div>
            </div>

            <hr className="margin-vertical-xs" />

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <a className="" target="_blank" href={icoWebsiteLink} rel="noopener noreferrer">INVEST</a>
              </div>
              <div className="col-xs-12 col-md-6">
                <a className="" target="_blank" href={`/profile/${ico._id}`} rel="noopener noreferrer">Details</a>
              </div>
            </div>

          </div>
        </div>

      </li>
    );
  }
}
