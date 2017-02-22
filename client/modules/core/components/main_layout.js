import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

import Navigation from '../containers/navigation';
import * as Rb from 'react-bootstrap';
import {Accounts} from 'meteor/std:accounts-ui';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import {StickyContainer} from 'react-sticky';

class Layout extends React.Component {

  render () {

    return (
      <div>
        <StickyContainer>

          <header className="fg-white">
            <div className="container-fluid">
              <Navigation/>
            </div>
          </header>

          <div className="container-fluid min-height-51rem margin-vertical-md">
            <div className="row">
              <div className="col-md-10 col-md-push-1">
                {this.props.content()}
              </div>
            </div>
          </div>

          { /* todo: move it to separate cmp */ }
          <footer>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-12 col-md-10 col-md-push-1">

                  <div className="row">
                    <div className="col-xs-12 col-md-5">
                      IcoIndex.com
                    </div>
                    <div className="col-xs-12 col-md-5">
                      <a className="hidden-link" href={FlowRouter.path('login')}>Login</a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </footer>

        </StickyContainer>
      </div>
    );
  }

}

export default Layout;
