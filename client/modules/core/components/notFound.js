import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

class NotFound extends React.Component {

  goHome() {
    FlowRouter.go('ico.home');
  }

  render() {

    return (
      <div>
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-12 text-center">
              <i className="icon icon--lg icon-Compass-4" />
              <h1>Error 404 - Page Not Found</h1>
              <a href={FlowRouter.path('ico.home')}><img src="/starwars_404.jpg" /></a>
              <p>
                The page you were looking for wasn't found.
              </p>
              <button onClick={this.goHome}
                className="btn btn-lg btn-extra-size btn-primary btn-outlined">
                <i className="fa fa-home margin-right-sm" aria-hidden="true" />
                Go back to the homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default NotFound;
