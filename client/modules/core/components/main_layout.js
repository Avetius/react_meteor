import React from 'react';
import {Accounts} from 'meteor/std:accounts-ui';
import Favicon from 'react-favicon';
import GlobalScrollingWaypoint from './globalScrollingWaypoint';

import Navigation from '../containers/navigation';
import Footer from './footer';

class Layout extends React.Component {

  render () {
    return (
      <div>
        <Favicon url={'/favicon-v3.png'}/>

          <header className="fg-white">
            <Navigation/>
          </header>

          <div className="container-fluid min-height-51rem margin-vertical-md">
            <div className="row">
              <div className="col-xs-12 col-sm-10 col-sm-push-1">
                {this.props.content()}
                <GlobalScrollingWaypoint context={this.props.context()} />
              </div>
            </div>
          </div>

          { /* todo: move it to separate cmp */ }
          <footer>
            <Footer />
          </footer>

      </div>
    );
  }

}

export default Layout;
