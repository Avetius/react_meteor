import React from 'react';
import moment from 'moment';
import IcoShortItemMainRows from './icoShortItemMainRows';

export default class IcoFrontItem extends React.Component {

  render() {
    const ico = this.props.icoEntity;

    const prefixHttpIfMissing = (link) => {
      return link.substr(0, 4) === 'http' ? link : 'http://' + link;
    };

    // render-validation -- should be removed in long term and fix in db instead
    const icoWebsiteLink = prefixHttpIfMissing(this.props.icoEntity.icoWebsiteLink);

    return (
      <li className="list-group-item padding-all-sm margin-bottom-md">
        <div className="row row-vertical-center">
          <div className="col-xs-12 col-md-2 padding-right-xs">
            <img className="img-responsive margin-top-sm" src="/Decent_foundation_logo.png" />
          </div>
          <div className="col-xs-12 col-md-10 padding-left-sm">

            <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={false} />

            <hr className="margin-vertical-xs" />

            <div className="row">
              <div className="col-xs-12 col-md-2 col-md-offset-8">
                <a className="btn btn-info" target="_blank" href={`/profile/${ico._id}`} rel="noopener noreferrer">Details</a>
              </div>
              <div className="col-xs-12 col-md-2">
                <a className="btn btn-warning" target="_blank" href={icoWebsiteLink} rel="noopener noreferrer">Invest</a>
              </div>
            </div>

          </div>
        </div>

      </li>
    );
  }
}
