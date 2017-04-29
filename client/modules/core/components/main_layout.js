import React from 'react';
import {Accounts} from 'meteor/std:accounts-ui';
import Favicon from 'react-favicon';
import {Helmet} from 'react-helmet';

import GlobalScrollingWaypoint from './globalScrollingWaypoint';

import Navigation from '../containers/navigation';
import Footer from './footer';
import Constants from '/client/configs/constants';

class Layout extends React.Component {

  render () {

    return (
      <div>

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
          <title>ICOindex - Find best ongoing and upcoming ICOs. We are aiming to make ICO transparent, easy to understand and available for everyone. </title>

          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://icoindex.com" />
          <meta property="og:image" content="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/ICOindex.com_has_launched_wide.png" />
          <meta property="og:title" content="ICOindex.com - Find best Initial Coin Offerings" />
          <meta property="og:description" content="We are aiming to make ICOs transparent, easy to understand and available for everyone." />
          <meta property="fb:app_id" content="897986073678471" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ICOindex" />
          <meta name="twitter:url" content="http://icoindex.com" />
          <meta name="twitter:image" content="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/ICOindex.com_has_launched_wide.png" />
          <meta name="twitter:title" content="ICOindex.com - Find best Initial Coin Offerings" />
          <meta name="twitter:description" content="We are aiming to make ICOs transparent, easy to understand and available for everyone." />
        </Helmet>
        <Favicon url={Constants.assetsUrls.pngFavicon}/>

      </div>
    );
  }

}

export default Layout;
