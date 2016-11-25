import React from 'react';
import Navigation from './navigation';
import * as Rb from 'react-bootstrap';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

const Layout = ({content = () => null }) => (
  <div className="">

    <header>
      <Grid className="">
        <Row className="">
          <Col sm={12} md={10} mdPush={1}>
            <h1>ICO index</h1>
            <Navigation />
          </Col>
        </Row>
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

export default Layout;
