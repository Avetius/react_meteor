import React from 'react';
import Link from './general/link';
import Icon from './general/icon';

export default class Footer extends React.Component {

  render () {
    return <div className="container-fluid padding-vertical-lg">
      <div className="row">
        <div className="col-xs-12 col-md-10 col-md-push-1">

          <div className="row">

            <div className="col-xs-12 col-md-6 padding-bottom-md">

              <div className="row padding-bottom-md">
                <div className="col-xs-12 col-sm-6 col-md-8">

                  <img className="img-responsive" src="/ICOindex.com-white.png" />

                </div>
              </div>

              <div className="row">
                <div className="col-xs-12 flex-vertical-center social-links-section">

                  <Link className="footer-social-link margin-right-md" linkHref={'https://twitter.com/ICOindex'}
                        linkProps={{target: '_blank'}}>
                    <Icon iconClasses={'fa fa-twitter social-icon'}
                          parentClasses='h4 margin-right-xs vertical-align-middle'
                          childrenPosition='beforeIcon'>
                      <span className="h5 margin-right-md">Follow</span>
                    </Icon>
                  </Link>

                  <Link className="footer-social-link margin-left-sm margin-right-md" linkHref={'https://www.facebook.com/ICOindex'}
                        linkProps={{target: '_blank'}}>
                    <Icon iconClasses={'fa fa-facebook-official social-icon'}
                          parentClasses='h4 margin-horizontal-xs vertical-align-middle'
                          childrenPosition='beforeIcon'>
                      <span className="h5 margin-right-md">Like</span>
                    </Icon>
                  </Link>

                  <Link className="footer-social-link margin-left-sm margin-right-md" linkHref={'https://bitcointalk.org/index.php?action=profile;u=948467;sa=showPosts'}
                        linkProps={{target: '_blank'}}>
                    <Icon iconClasses={'fa fa-btc social-icon'}
                          parentClasses='h4 margin-horizontal-xs vertical-align-middle'
                          childrenPosition='beforeIcon'>
                      <span className="h5 margin-right-md">Talk</span>
                    </Icon>
                  </Link>

                </div>
              </div>

            </div>

            <div className="col-xs-12 col-md-6 padding-bottom-md">

              <div className="row">
                <div className="col-xs-12">

                  <Link linkHref='http://icoindex.com'>ICOindex.com</Link>  is a platform that enables you to find
                  all ongoing and upcoming ICOs. There are many ICOs happening around the world.
                  Thanks to <Link linkHref='http://icoindex.com'>ICOindex.com</Link> you will never miss
                  the next Initial Coin Offering.
                </div>
              </div>

            </div>

            <div className="col-xs-12 padding-bottom-md">
              <p> All Initial coin offerings on <Link linkHref='http://icoindex.com'>ICOindex.com</Link> have been
                checked before publishing on this website. By using website
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> you agree that you have done your own
                due diligence before participating in any initial coin offering or any other project listed on this website.
                Moreover we strongly discourage people from participating in initial coin offerings that are listed
                in scam or suspicious group.
              </p>
              <p>
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> cannot be hold responsible for any issues
                relating to projects listed on <Link linkHref='http://icoindex.com'>ICOindex.com</Link> website.
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link>  is not a founder of initial coin offerings and
                is not connected with them in any way.
              </p>
              <p>
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link>  does not give any investment recommendations.
                <Link linkHref='http://icoindex.com'>ICOindex.com</Link> serves solely for collecting important
                information about initial coin offerings.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>;
  }
}
