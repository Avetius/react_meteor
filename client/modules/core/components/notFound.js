import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import Constants from '/client/configs/constants';

class NotFound extends React.Component {

  goHome() {
    FlowRouter.go('ico.home');
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-push-1 text-center">
            <i className="icon icon--lg icon-Compass-4" />
            <h1>Error 404 - Page Not Found</h1>
            <div className="row flex-horizontal-center">
              <div className="col-md-10">
                <a className="margin-top-md" href={FlowRouter.path('ico.home')}>
                  <img className="img-responsive" src={Constants.assetsUrls.page404img} />
                </a>
              </div>
            </div>
            <p className="margin-top-sm">
              The page you were looking for wasn't found.
            </p>
            {/* TODO: replace by primary button! */}

            <a className="btn btn-ico-primary margin-top-md" href={FlowRouter.path('ico.home')}
               rel="noopener noreferrer">
              <i className="fa fa-home margin-right-sm" aria-hidden="true" />
              Go back to the homepage
            </a>
          </div>
        </div>
      </div>
    );

  }
}

export default NotFound;
