import React from 'react';
import {Accounts} from 'meteor/std:accounts-ui';
import Favicon from 'react-favicon';
import {Helmet} from "react-helmet";

import GlobalScrollingWaypoint from './globalScrollingWaypoint';

import Navigation from '../containers/navigation';
import Footer from './footer';
import Constants from '/client/configs/constants';

class Layout extends React.Component {

  render () {
    //console.log(Helmet);

    return (
      <div>
        <Favicon url={Constants.assetsUrls.svgFavicon}/>

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

        <Helmet>
          {/* without Prerender.io these properties are only visible in client, so not for crawlers

          // todo: uncomment this after Prerender.io will be setup
           <title>ICOindex.com</title>
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <meta property="og:url" content="http://icoindex.com" />
           <meta property="og:image" content="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/icoindex.com_has_launched.png" />
           <meta property="og:title" content="ICOindex.com - Find best Initial Coin Offerings" />
           <meta property="og:description" content="We are aiming to make ICOs transparent, easy to understand and available for everyone." /> */}
        </Helmet>

      </div>
    );
  }

}

export default Layout;
