import React from 'react';
import Navigation from '../containers/navigation';
import * as Rb from 'react-bootstrap';
import {Accounts} from 'meteor/std:accounts-ui';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

const Layout = ({content = () => null, context}) => {

  return (
    <div className="">

      <header className="bg-theme-darkblue fg-white border-brightblue border-bottom-1-solid">
        <Grid className="">
          <Row className="margin-vertical-lg">
            <Col sm={6} md={4}>
              <img className="img-responsive" src="/logo1_min.png" />
            </Col>
            <Col sm={6} md={3} mdPush={5}>
              <Accounts.ui.LoginForm />
            </Col>
          </Row>

          <div className="row">
            <div className="col-xs-12 col-md-10 col-md-push-1">
              <Navigation/>
            </div>
          </div>
        </Grid>
      </header>

      <div className="container-fluid min-height-51rem margin-vertical-md">
        <div className="row">
          <div className="col-md-10 col-md-push-1">
            {content()}
          </div>
        </div>
      </div>

      <footer>
        <Grid className="">
          <Row className="">
            <Col sm={12} md={10} mdPush={1}>
              <small>Footer placeholder.</small>
            </Col>
          </Row>
        </Grid>
      </footer>

    </div>
  );
};

export default Layout;
