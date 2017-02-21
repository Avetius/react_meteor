import React from 'react';
import moment from 'moment';
import {FlowRouter} from 'meteor/kadira:flow-router';

import AccountsMgmt from '/lib/accountsMgmt';
import IcoShortItemMainRows from './icoShortItemMainRows';
import IcoStatus from '/lib/icoStatus';

export default class IcoFrontItem extends React.Component {

  render() {
    const ico = this.props.icoEntity;

    return (
      <li className="list-group-item padding-all-sm margin-bottom-md ico-box">
        <div className="row row-vertical-center">
          <div className="col-xs-12 col-md-2 padding-right-xs">
            <a href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) } rel="noopener noreferrer">
              <img className="img-responsive margin-top-sm" src={this.props.icoEntity.icoProjectLogo || '/logo.svg'} />
            </a>
          </div>
          <div className="col-xs-12 col-md-10 padding-left-sm">

            <IcoShortItemMainRows ico={this.props.icoEntity} isProfile={false} />

            <hr className="margin-vertical-xs" />

            <div className="row row-vertical-center">

              <div className="col-xs-12 col-md-3 col-md-offset-3 padding-top-sm">
                { AccountsMgmt.isCurrentUserAdmin() ? (
                  <a href={ FlowRouter.path('ico.edit', { icoSlug: ico._id }) }>
                    <span className="h4">
                      <i className="fa fa-pencil margin-right-sm" />
                      Edit ICO
                    </span>
                  </a> ) : ''
                }
              </div>

              <div className="col-xs-12 col-md-4 padding-right-sm">
                { IcoStatus.isOngoing(ico) || IcoStatus.isUpcoming(ico) ?
                  <div className="btn-ico-secondary-wrapper-outer pull-right max-width-22rem">
                    <div className="btn-ico-secondary-wrapper-inner">
                      <a className="btn btn-ico-secondary" target="_blank" href={this.props.icoEntity.icoWebsiteLink}
                         rel="noopener noreferrer" disabled={!this.props.icoEntity.icoWebsiteLink}>Participate in ICO</a>
                    </div>
                  </div>
                  : ''
                }
              </div>

              <div className="col-xs-12 col-md-2 padding-left-sm">
                <div>
                  <a className="btn btn-ico-primary" href={ FlowRouter.path('ico.profile', { icoSlug: ico._id }) }
                     rel="noopener noreferrer"> Details </a>
                </div>
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
