import React from 'react';
//import Navigation from './navigation';
import * as Rb from 'react-bootstrap';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

const Layout = ({content = () => null }) => (
  <div>
    <header>
    <h1>Mantra Voice</h1>
      {/*<Navigation /> */}
    </header>

    <div className="container">
    {content()}
    </div>

    <footer>
    <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> &amp; Meteor.</small>
    </footer>
  </div>
);

export default Layout;
