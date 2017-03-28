import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

import Navigation from '../containers/navigation';
import Footer from './footer';

import * as Rb from 'react-bootstrap';
import {Accounts} from 'meteor/std:accounts-ui';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import Favicon from 'react-favicon';

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
