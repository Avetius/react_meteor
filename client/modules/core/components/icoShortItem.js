import React from 'react';
import moment from 'moment';

export default class IcoFrontItem extends React.Component {

  render() {
    const ico = this.props.icoEntity;
    console.log(this.props);

    // render-validation -- should be removed in long term and fix db
    let icoWebsiteLink = this.props.icoEntity.icoWebsiteLink;
    icoWebsiteLink = icoWebsiteLink.substr(0, 4) === 'http' ?
      icoWebsiteLink : 'http://' + icoWebsiteLink;

    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-xs-12 col-md-2">
            <img className="img-responsive" src="/Ico_Wallpaper_2.jpg" />
          </div>
          <div className="col-xs-12 col-md-10">

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <h4>{ico.projectName}<span className="text-uppercase">{` (${ico.abbreviation})`}</span></h4>
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
