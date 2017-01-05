import React from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router';

import AccountsMgmt from '/client/configs/accountsMgmt';
import IcoShortItemMainRows from './icoShortItemMainRows';

export default class IcoFrontItem extends React.Component {

  render() {
    const ico = this.props.icoEntity;

    return (
      <li className="list-group-item padding-all-sm margin-bottom-md">
        <div className="row row-vertical-center">
          <div className="col-xs-12 col-md-2 padding-right-xs">
            <a href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } rel="noopener noreferrer">
              <img className="img-responsive margin-top-sm" src={this.props.icoEntity.icoProjectLogo || '/logo1_min.png'} />
            </a>
          </div>
          <div className="col-xs-12 col-md-10 padding-left-sm">

            <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={false} />

            <hr className="margin-vertical-xs" />

            <div className="row row-vertical-center">

              <div className="col-xs-12 col-md-3 col-md-offset-4 padding-top-sm">
                { AccountsMgmt.isAdmin() ? (
                  <a href={ FlowRouter.path('ico.edit', { icoSlug: ico._id }) }>
                    <span className="h4">
                      <i className="fa fa-pencil margin-right-sm" />
                      Edit ICO
                    </span>
                  </a> ) : ''
                }
              </div>

              <div className="col-xs-12 col-md-2">
                <a className="btn btn-darkblue" href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } rel="noopener noreferrer">Details</a>
              </div>
              <div className="col-xs-12 col-md-3">
                <a className="btn btn-warning" target="_blank" href={this.props.icoEntity.icoWebsiteLink}
                   rel="noopener noreferrer" disabled={!this.props.icoEntity.icoWebsiteLink}>Participate in ICO</a>
              </div>
            </div>

          </div>
        </div>

      </li>
    );
  }
}

IcoFrontItem.defaultProps = {
  icoEntity: {
    icoEvents: [],
    coFounders: []
  }
};
