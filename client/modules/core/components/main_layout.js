import React from 'react';
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

        <Helmet>
          <title>ICOindex - Find the best Initial Coin Offerings (ICO) - ICOindex.com</title>
          <meta name="google-site-verification" content="googledfebaf8ee0606efd"/>

          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:image" content="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/ICOindex.com-300-dpi.png" />
          <meta property="og:title" content="ICOindex.com - Find best Initial Coin Offerings" />
          <meta property="og:description" content="We are aiming to make ICOs transparent, easy to understand and available for everyone." />
          <meta property="fb:app_id" content="897986073678471" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ICOindex" />
          <meta name="twitter:url" content={window.location.href} />
          <meta name="twitter:image" content="https://s3.eu-central-1.amazonaws.com/ico-p1/appResources/ICOindex.com-300-dpi.png" />
          <meta name="twitter:title" content="ICOindex.com - Find best Initial Coin Offerings" />
          <meta name="twitter:description" content="We are aiming to make ICOs transparent, easy to understand and available for everyone." />

          {/* Currently making 'URLs contain raw newline characters are deprecated' warning in console. About warning: https://www.chromestatus.com/features/5735596811091968  */}
          <script type="text/javascript">
            {`window.smartlook||(function(d) {
                var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
                var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
                c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', '91833eb93c4835292b09ed378ef2efd5a220b6b0');
            `}
          </script>

        </Helmet>


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

        <Favicon url={Constants.assetsUrls.pngFavicon}/>

      </div>
    );
  }

}

export default Layout;
